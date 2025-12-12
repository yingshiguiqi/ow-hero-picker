using System.Collections.ObjectModel;
using System.Diagnostics;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using OwHeroPicker.Data;
using OwHeroPicker.Models;
using OwHeroPicker.Services;

namespace OwHeroPicker.ViewModels;

public partial class MainViewModel : ObservableObject
{
    private readonly RecommendService _recommendService = new();
    private readonly PresetService _presetService = new();

    [ObservableProperty]
    private ObservableCollection<Hero> _tanks = new(HeroData.Tanks);

    [ObservableProperty]
    private ObservableCollection<Hero> _damages = new(HeroData.Damages);

    [ObservableProperty]
    private ObservableCollection<Hero> _supports = new(HeroData.Supports);

    [ObservableProperty]
    private ObservableCollection<GameMap> _maps = new(MapData.Maps);

    // 按类型分组的地图
    public ObservableCollection<GameMap> ControlMaps { get; } = new(MapData.ControlMaps);
    public ObservableCollection<GameMap> PushMaps { get; } = new(MapData.PushMaps);
    public ObservableCollection<GameMap> FlashpointMaps { get; } = new(MapData.FlashpointMaps);
    public ObservableCollection<GameMap> EscortMaps { get; } = new(MapData.EscortMaps);
    public ObservableCollection<GameMap> HybridMaps { get; } = new(MapData.HybridMaps);

    // 地图搜索
    [ObservableProperty]
    private string _mapSearchKeyword = "";

    [ObservableProperty]
    private ObservableCollection<GameMap> _filteredMaps = new();

    partial void OnMapSearchKeywordChanged(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            FilteredMaps.Clear();
        }
        else
        {
            var keyword = value.ToLower();
            var results = MapData.Maps
                .Where(m => m.Name.ToLower().Contains(keyword) || 
                           (m.SubMaps?.Any(s => s.Name.ToLower().Contains(keyword)) ?? false))
                .ToList();
            FilteredMaps = new ObservableCollection<GameMap>(results);
        }
    }

    [ObservableProperty]
    private GameMap? _selectedMap;

    [ObservableProperty]
    private BattleState _battleState = new();

    [ObservableProperty]
    private TeamAnalysis? _teamAnalysis;

    [ObservableProperty]
    private ObservableCollection<HeroRecommendation> _recommendations = new();

    [ObservableProperty]
    private int _selectedEnemySlot = -1;

    [ObservableProperty]
    private int _selectedMySlot = -1;

    [ObservableProperty]
    private string _currentTab = "maps"; // battle, maps, counters - 默认地图推荐

    [ObservableProperty]
    private bool _isEnemyMode = true; // true=添加到敌方, false=添加到己方

    // 地图推荐 - 使用预设配置
    [ObservableProperty]
    private ObservableCollection<Hero> _goodHeroes = new();  // 推荐

    [ObservableProperty]
    private ObservableCollection<Hero> _averageHeroes = new();  // 备选

    [ObservableProperty]
    private ObservableCollection<Hero> _badHeroes = new();  // 不推荐

    [ObservableProperty]
    private string _mapNotes = "";

    // 当前选中的子地图
    [ObservableProperty]
    private SubMap? _selectedSubMap;

    // 克制关系
    [ObservableProperty]
    private Hero? _selectedHeroForCounter;

    [ObservableProperty]
    private ObservableCollection<CounterInfo> _weaknesses = new(); // 克制该英雄的（弱点）

    [ObservableProperty]
    private ObservableCollection<CounterInfo> _strengths = new(); // 被该英雄克制的（优势）

    [ObservableProperty]
    private string _weaknessNote = ""; // 弱点描述

    [ObservableProperty]
    private ObservableCollection<Hero> _allHeroes = new(HeroData.Heroes);

    // 搜索功能
    [ObservableProperty]
    private string _searchKeyword = "";

    [ObservableProperty]
    private ObservableCollection<Hero> _searchResults = new();

    // 预设管理
    [ObservableProperty]
    private string _presetName = "";

    [ObservableProperty]
    private string _presetStats = "";

    [ObservableProperty]
    private bool _isEditingHeroRating = false;

    // 未评级英雄（用于自定义配置）
    [ObservableProperty]
    private ObservableCollection<Hero> _unratedHeroes = new();

    public MainViewModel()
    {
        // 后台预加载所有英雄图片
        Task.Run(() =>
        {
            foreach (var hero in HeroData.Heroes)
            {
                if (!string.IsNullOrEmpty(hero.AvatarPath))
                {
                    Converters.ImageCache.GetOrLoad(hero.AvatarPath);
                }
            }
        });
        
        UpdateAnalysis();
    }

    partial void OnSelectedMapChanged(GameMap? value)
    {
        if (value != null)
        {
            // 如果有子地图，默认选第一个；否则直接加载地图配置
            if (value.SubMaps != null && value.SubMaps.Count > 0)
            {
                SelectedSubMap = value.SubMaps[0];
            }
            else
            {
                SelectedSubMap = null;
                LoadMapRatings(value.Id, null);
            }
        }
    }

    partial void OnSelectedSubMapChanged(SubMap? value)
    {
        if (SelectedMap != null)
        {
            LoadMapRatings(SelectedMap.Id, value?.Id);
        }
    }

    private void LoadMapRatings(string mapId, string? subMapId)
    {
        // 使用 Dispatcher 延迟加载，避免 UI 卡顿
        System.Windows.Application.Current?.Dispatcher.BeginInvoke(
            System.Windows.Threading.DispatcherPriority.Background,
            () => LoadMapRatingsCore(mapId, subMapId));
    }

    private void LoadMapRatingsCore(string mapId, string? subMapId)
    {
        var ratings = _presetService.GetMapRatings(mapId, subMapId);
        
        // 清空并重新填充，而不是创建新集合
        GoodHeroes.Clear();
        foreach (var h in ratings.Good) GoodHeroes.Add(h);
        
        AverageHeroes.Clear();
        foreach (var h in ratings.Average) AverageHeroes.Add(h);
        
        BadHeroes.Clear();
        foreach (var h in ratings.Bad) BadHeroes.Add(h);

        // 计算未评级英雄
        var ratedIds = ratings.Good.Concat(ratings.Average).Concat(ratings.Bad).Select(h => h.Id).ToHashSet();
        UnratedHeroes.Clear();
        foreach (var h in HeroData.Heroes.Where(h => !ratedIds.Contains(h.Id))) UnratedHeroes.Add(h);

        // 设置备注
        var preset = MapPresets.GetPreset(mapId);
        MapNotes = preset?.Notes ?? "";

        // 更新预设统计
        var stats = _presetService.GetConfigStats();
        PresetStats = $"已配置 {stats.mapCount} 张地图，{stats.heroCount} 条评级";
        PresetName = _presetService.GetConfigName();
    }

    partial void OnSelectedHeroForCounterChanged(Hero? value)
    {
        if (value != null)
        {
            Weaknesses = new ObservableCollection<CounterInfo>(CounterData.GetWeaknesses(value.Id));
            Strengths = new ObservableCollection<CounterInfo>(CounterData.GetStrengths(value.Id));
            WeaknessNote = CounterData.GetWeaknessNote(value.Id) ?? "";
        }
        else
        {
            Weaknesses.Clear();
            Strengths.Clear();
            WeaknessNote = "";
        }
    }

    partial void OnSearchKeywordChanged(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            SearchResults.Clear();
        }
        else
        {
            SearchResults = new ObservableCollection<Hero>(HeroData.Search(value));
        }
    }

    [RelayCommand]
    private void SelectEnemySlot(object? param)
    {
        if (param != null && int.TryParse(param.ToString(), out int slot))
        {
            SelectedEnemySlot = slot;
            SelectedMySlot = -1;
        }
    }

    [RelayCommand]
    private void SelectMySlot(object? param)
    {
        if (param != null && int.TryParse(param.ToString(), out int slot))
        {
            SelectedMySlot = slot;
            SelectedEnemySlot = -1;
        }
    }

    [RelayCommand]
    private void SetEnemyHero(string heroId)
    {
        // 如果选中了槽位，填入该槽位
        if (SelectedEnemySlot >= 0 && SelectedEnemySlot < 5)
        {
            BattleState.SetEnemy(SelectedEnemySlot, heroId);
            SelectedEnemySlot = -1;
            OnPropertyChanged(nameof(BattleState));
            UpdateAnalysis();
            return;
        }
        
        // 否则自动填入第一个空槽位
        for (int i = 0; i < 5; i++)
        {
            if (BattleState.EnemyTeam[i] == null)
            {
                BattleState.SetEnemy(i, heroId);
                OnPropertyChanged(nameof(BattleState));
                UpdateAnalysis();
                return;
            }
        }
    }

    [RelayCommand]
    private void SetMyHero(string heroId)
    {
        // 如果选中了槽位，填入该槽位
        if (SelectedMySlot >= 0 && SelectedMySlot < 5)
        {
            BattleState.SetMy(SelectedMySlot, heroId);
            SelectedMySlot = -1;
            OnPropertyChanged(nameof(BattleState));
            UpdateAnalysis();
            return;
        }
        
        // 否则自动填入第一个空槽位
        for (int i = 0; i < 5; i++)
        {
            if (BattleState.MyTeam[i] == null)
            {
                BattleState.SetMy(i, heroId);
                OnPropertyChanged(nameof(BattleState));
                UpdateAnalysis();
                return;
            }
        }
    }

    [RelayCommand]
    private void ClearEnemySlot(object? param)
    {
        if (param != null && int.TryParse(param.ToString(), out int slot) && slot >= 0 && slot < 5)
        {
            BattleState.SetEnemy(slot, null);
            OnPropertyChanged(nameof(BattleState));
            UpdateAnalysis();
        }
    }

    [RelayCommand]
    private void ClearMySlot(object? param)
    {
        if (param != null && int.TryParse(param.ToString(), out int slot) && slot >= 0 && slot < 5)
        {
            BattleState.SetMy(slot, null);
            OnPropertyChanged(nameof(BattleState));
            UpdateAnalysis();
        }
    }

    [RelayCommand]
    private void ClearEnemyTeam()
    {
        BattleState.ClearEnemy();
        OnPropertyChanged(nameof(BattleState));
        UpdateAnalysis();
    }

    [RelayCommand]
    private void ClearMyTeam()
    {
        BattleState.ClearMy();
        OnPropertyChanged(nameof(BattleState));
        UpdateAnalysis();
    }

    [RelayCommand]
    private void ClearAll()
    {
        BattleState.Clear();
        OnPropertyChanged(nameof(BattleState));
        UpdateAnalysis();
    }

    [RelayCommand]
    private void OpenHeroWiki(string heroId)
    {
        var hero = HeroData.GetHeroById(heroId);
        if (hero != null)
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = hero.GetWikiUrl(),
                UseShellExecute = true
            });
        }
    }

    [RelayCommand]
    private void SwitchTab(string tab)
    {
        CurrentTab = tab;
    }

    [RelayCommand]
    private void SelectMap(GameMap map)
    {
        SelectedMap = map;
    }

    [RelayCommand]
    private void SelectSubMap(SubMap subMap)
    {
        // 找到父地图
        var parentMap = MapData.Maps.FirstOrDefault(m => m.SubMaps?.Any(s => s.Id == subMap.Id) == true);
        if (parentMap != null)
        {
            // 先设置父地图（不触发自动选择第一个子地图）
            _selectedMap = parentMap;
            OnPropertyChanged(nameof(SelectedMap));
        }
        SelectedSubMap = subMap;
    }

    [RelayCommand]
    private void SetHeroRating(string param)
    {
        // 参数格式: heroId|rating
        var parts = param.Split('|');
        if (parts.Length != 2) return;

        var heroId = parts[0];
        var rating = parts[1];

        if (SelectedMap == null) return;

        _presetService.UpdateHeroRating(SelectedMap.Id, SelectedSubMap?.Id, heroId, rating);
        
        // 重新加载
        LoadMapRatings(SelectedMap.Id, SelectedSubMap?.Id);
    }

    [RelayCommand]
    private void SelectHeroForCounter(Hero hero)
    {
        SelectedHeroForCounter = hero;
    }

    [RelayCommand]
    private void ToggleMode()
    {
        IsEnemyMode = !IsEnemyMode;
    }

    /// <summary>
    /// 左键添加英雄（根据当前模式）
    /// </summary>
    [RelayCommand]
    private void AddHero(string heroId)
    {
        if (IsEnemyMode)
            AddToEnemy(heroId);
        else
            AddToMy(heroId);
    }

    /// <summary>
    /// 检查英雄是否已被选择
    /// </summary>
    private bool IsHeroAlreadySelected(string heroId)
    {
        return BattleState.MyTeam.Contains(heroId) || BattleState.EnemyTeam.Contains(heroId);
    }

    /// <summary>
    /// 左键添加到己方（快捷操作）
    /// </summary>
    [RelayCommand]
    private void AddToMy(string heroId)
    {
        // 检查英雄是否已被选择
        if (IsHeroAlreadySelected(heroId)) return;
        
        if (SelectedMySlot >= 0 && SelectedMySlot < 5)
        {
            BattleState.SetMy(SelectedMySlot, heroId);
            SelectedMySlot = -1;
        }
        else
        {
            for (int i = 0; i < 5; i++)
            {
                if (BattleState.MyTeam[i] == null)
                {
                    BattleState.SetMy(i, heroId);
                    break;
                }
            }
        }
        OnPropertyChanged(nameof(BattleState));
        UpdateAnalysis();
    }

    /// <summary>
    /// 右键添加到敌方（快捷操作）
    /// </summary>
    [RelayCommand]
    private void AddToEnemy(string heroId)
    {
        // 检查英雄是否已被选择
        if (IsHeroAlreadySelected(heroId)) return;
        
        if (SelectedEnemySlot >= 0 && SelectedEnemySlot < 5)
        {
            BattleState.SetEnemy(SelectedEnemySlot, heroId);
            SelectedEnemySlot = -1;
        }
        else
        {
            for (int i = 0; i < 5; i++)
            {
                if (BattleState.EnemyTeam[i] == null)
                {
                    BattleState.SetEnemy(i, heroId);
                    break;
                }
            }
        }
        OnPropertyChanged(nameof(BattleState));
        UpdateAnalysis();
    }

    private void UpdateAnalysis()
    {
        TeamAnalysis = _recommendService.AnalyzeTeam(BattleState.MyTeam, BattleState.EnemyTeam);
        Recommendations = new ObservableCollection<HeroRecommendation>(TeamAnalysis.Recommendations);
    }

    public Hero? GetHeroById(string? id) => id != null ? HeroData.GetHeroById(id) : null;

    // ===== 预设管理命令 =====

    [RelayCommand]
    private void ToggleEditMode()
    {
        IsEditingHeroRating = !IsEditingHeroRating;
    }

    [RelayCommand]
    private void ExportPreset()
    {
        try
        {
            var json = _presetService.ExportConfig();
            var dialog = new Microsoft.Win32.SaveFileDialog
            {
                Filter = "JSON文件|*.json",
                FileName = $"预设配置_{DateTime.Now:yyyyMMdd}.json"
            };
            if (dialog.ShowDialog() == true)
            {
                System.IO.File.WriteAllText(dialog.FileName, json);
                System.Windows.MessageBox.Show("导出成功！", "提示", System.Windows.MessageBoxButton.OK, System.Windows.MessageBoxImage.Information);
            }
        }
        catch (Exception ex)
        {
            System.Windows.MessageBox.Show($"导出失败: {ex.Message}", "错误", System.Windows.MessageBoxButton.OK, System.Windows.MessageBoxImage.Error);
        }
    }

    [RelayCommand]
    private void ImportPreset()
    {
        try
        {
            var dialog = new Microsoft.Win32.OpenFileDialog
            {
                Filter = "JSON文件|*.json"
            };
            if (dialog.ShowDialog() == true)
            {
                var json = System.IO.File.ReadAllText(dialog.FileName);
                if (_presetService.ImportConfig(json))
                {
                    // 重新加载当前地图
                    if (SelectedMap != null)
                    {
                        LoadMapRatings(SelectedMap.Id, SelectedSubMap?.Id);
                    }
                    System.Windows.MessageBox.Show("导入成功！", "提示", System.Windows.MessageBoxButton.OK, System.Windows.MessageBoxImage.Information);
                }
                else
                {
                    System.Windows.MessageBox.Show("导入失败，配置文件格式错误", "错误", System.Windows.MessageBoxButton.OK, System.Windows.MessageBoxImage.Error);
                }
            }
        }
        catch (Exception ex)
        {
            System.Windows.MessageBox.Show($"导入失败: {ex.Message}", "错误", System.Windows.MessageBoxButton.OK, System.Windows.MessageBoxImage.Error);
        }
    }

    [RelayCommand]
    private void ResetPreset()
    {
        var result = System.Windows.MessageBox.Show("确定要重置为出厂设置吗？当前配置将丢失！", "确认重置", 
            System.Windows.MessageBoxButton.YesNo, System.Windows.MessageBoxImage.Warning);
        if (result == System.Windows.MessageBoxResult.Yes)
        {
            _presetService.ResetToFactory();
            if (SelectedMap != null)
            {
                LoadMapRatings(SelectedMap.Id, SelectedSubMap?.Id);
            }
            System.Windows.MessageBox.Show("已重置为出厂设置", "提示", System.Windows.MessageBoxButton.OK, System.Windows.MessageBoxImage.Information);
        }
    }

    [RelayCommand]
    private void ClearMapRatings()
    {
        if (SelectedMap == null) return;
        
        var result = System.Windows.MessageBox.Show($"确定要清空 {SelectedMap.Name} 的所有评级吗？", "确认清空", 
            System.Windows.MessageBoxButton.YesNo, System.Windows.MessageBoxImage.Warning);
        if (result == System.Windows.MessageBoxResult.Yes)
        {
            _presetService.ClearMapConfig(SelectedMap.Id, SelectedSubMap?.Id);
            LoadMapRatings(SelectedMap.Id, SelectedSubMap?.Id);
        }
    }

    [RelayCommand]
    private void RemoveHeroFromRating(string heroId)
    {
        if (SelectedMap == null) return;
        _presetService.RemoveHeroRating(SelectedMap.Id, SelectedSubMap?.Id, heroId);
        LoadMapRatings(SelectedMap.Id, SelectedSubMap?.Id);
    }
}
