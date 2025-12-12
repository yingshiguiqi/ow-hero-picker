using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace OwHeroPicker.Models;

/// <summary>
/// 实战面板状态
/// </summary>
public class BattleState : INotifyPropertyChanged
{
    private ObservableCollection<string?> _enemyTeam = new(new string?[5]);
    private ObservableCollection<string?> _myTeam = new(new string?[5]);

    public ObservableCollection<string?> EnemyTeam
    {
        get => _enemyTeam;
        set { _enemyTeam = value; OnPropertyChanged(); OnPropertyChanged(nameof(EnemyCount)); }
    }

    public ObservableCollection<string?> MyTeam
    {
        get => _myTeam;
        set { _myTeam = value; OnPropertyChanged(); OnPropertyChanged(nameof(MyCount)); }
    }

    public int EnemyCount => EnemyTeam.Count(h => h != null);
    public int MyCount => MyTeam.Count(h => h != null);

    public void SetEnemy(int index, string? heroId)
    {
        if (index >= 0 && index < 5)
        {
            EnemyTeam[index] = heroId;
            OnPropertyChanged(nameof(EnemyTeam));
            OnPropertyChanged(nameof(EnemyCount));
        }
    }

    public void SetMy(int index, string? heroId)
    {
        if (index >= 0 && index < 5)
        {
            MyTeam[index] = heroId;
            OnPropertyChanged(nameof(MyTeam));
            OnPropertyChanged(nameof(MyCount));
        }
    }

    public void Clear()
    {
        for (int i = 0; i < 5; i++)
        {
            EnemyTeam[i] = null;
            MyTeam[i] = null;
        }
        OnPropertyChanged(nameof(EnemyTeam));
        OnPropertyChanged(nameof(MyTeam));
        OnPropertyChanged(nameof(EnemyCount));
        OnPropertyChanged(nameof(MyCount));
    }

    public void ClearEnemy()
    {
        for (int i = 0; i < 5; i++) EnemyTeam[i] = null;
        OnPropertyChanged(nameof(EnemyTeam));
        OnPropertyChanged(nameof(EnemyCount));
    }

    public void ClearMy()
    {
        for (int i = 0; i < 5; i++) MyTeam[i] = null;
        OnPropertyChanged(nameof(MyTeam));
        OnPropertyChanged(nameof(MyCount));
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    protected void OnPropertyChanged([CallerMemberName] string? name = null)
        => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
}

/// <summary>
/// 阵容分析结果
/// </summary>
public class TeamAnalysis
{
    public int OverallScore { get; set; }
    public int TankCount { get; set; }
    public int DamageCount { get; set; }
    public int SupportCount { get; set; }
    public List<string> Issues { get; set; } = new();
    public List<HeroRecommendation> Recommendations { get; set; } = new();
}

/// <summary>
/// 英雄推荐
/// </summary>
public class HeroRecommendation
{
    public Hero Hero { get; set; } = null!;
    public int Score { get; set; }
    public string Reason { get; set; } = string.Empty;
}
