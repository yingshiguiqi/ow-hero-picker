using System.Collections.Concurrent;
using System.Globalization;
using System.Windows;
using System.Windows.Data;
using System.Windows.Media.Imaging;

namespace OwHeroPicker.Converters;

/// <summary>
/// 图片缓存 - 避免重复加载
/// </summary>
public static class ImageCache
{
    private static readonly ConcurrentDictionary<string, BitmapImage> _cache = new();

    public static BitmapImage? GetOrLoad(string path)
    {
        if (string.IsNullOrEmpty(path)) return null;
        
        return _cache.GetOrAdd(path, p =>
        {
            try
            {
                var uri = new Uri($"pack://application:,,,/Assets/Heroes/{p}", UriKind.Absolute);
                var bitmap = new BitmapImage();
                bitmap.BeginInit();
                bitmap.UriSource = uri;
                bitmap.CacheOption = BitmapCacheOption.OnLoad;
                bitmap.DecodePixelWidth = 64; // 限制解码尺寸，减少内存
                bitmap.EndInit();
                bitmap.Freeze(); // 冻结以支持跨线程访问
                return bitmap;
            }
            catch
            {
                return null!;
            }
        });
    }
}

public class FirstCharConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is string str && !string.IsNullOrEmpty(str))
        {
            return str[0].ToString();
        }
        return "?";
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

public class ZeroToVisibleConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is int count)
        {
            return count == 0 ? Visibility.Visible : Visibility.Collapsed;
        }
        return Visibility.Collapsed;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

public class BoolToVisibilityConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is bool b)
        {
            return b ? Visibility.Visible : Visibility.Collapsed;
        }
        return Visibility.Collapsed;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

public class NullToVisibilityConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        // 检查是否为空或空字符串
        bool isEmpty = value == null || (value is string s && string.IsNullOrWhiteSpace(s));
        bool invert = parameter is string p && p == "invert";
        
        if (invert)
            return isEmpty ? Visibility.Collapsed : Visibility.Visible;
        else
            return isEmpty ? Visibility.Visible : Visibility.Collapsed;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

public class HeroAvatarConverter : IValueConverter
{
    public object? Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is string avatarPath && !string.IsNullOrEmpty(avatarPath))
        {
            return ImageCache.GetOrLoad(avatarPath);
        }
        return null;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

public class HeroIdToAvatarConverter : IValueConverter
{
    public object? Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is string heroId && !string.IsNullOrEmpty(heroId))
        {
            var hero = OwHeroPicker.Data.HeroData.GetHeroById(heroId);
            if (hero != null && !string.IsNullOrEmpty(hero.AvatarPath))
            {
                return ImageCache.GetOrLoad(hero.AvatarPath);
            }
        }
        return null;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

public class ModeTextConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        return value is bool isEnemy && isEnemy ? "→ 敌方" : "→ 己方";
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

public class ModeBgConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        return value is bool isEnemy && isEnemy 
            ? new System.Windows.Media.SolidColorBrush(System.Windows.Media.Color.FromRgb(239, 68, 68))  // 红色
            : new System.Windows.Media.SolidColorBrush(System.Windows.Media.Color.FromRgb(59, 130, 246)); // 蓝色
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

public class TabVisibilityConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is string currentTab && parameter is string targetTab)
        {
            return currentTab == targetTab ? System.Windows.Visibility.Visible : System.Windows.Visibility.Collapsed;
        }
        return System.Windows.Visibility.Collapsed;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

// Tier 等级转边框颜色
public class TierToBorderBrushConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        var tier = value as string ?? "B";
        var colorType = parameter as string ?? "red";
        
        if (colorType == "red")
        {
            return tier switch
            {
                "S" => new System.Windows.Media.SolidColorBrush(System.Windows.Media.Color.FromRgb(255, 180, 0)),   // 金色
                "A" => new System.Windows.Media.SolidColorBrush(System.Windows.Media.Color.FromRgb(248, 81, 73)),   // 亮红
                _ => new System.Windows.Media.SolidColorBrush(System.Windows.Media.Color.FromRgb(180, 80, 80))      // 暗红
            };
        }
        else // green
        {
            return tier switch
            {
                "S" => new System.Windows.Media.SolidColorBrush(System.Windows.Media.Color.FromRgb(255, 215, 0)),   // 金色
                "A" => new System.Windows.Media.SolidColorBrush(System.Windows.Media.Color.FromRgb(63, 185, 80)),   // 亮绿
                _ => new System.Windows.Media.SolidColorBrush(System.Windows.Media.Color.FromRgb(80, 140, 80))      // 暗绿
            };
        }
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}

// Tier 等级转背景色
public class TierToBackgroundConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        var tier = value as string ?? "B";
        return tier switch
        {
            "S" => new System.Windows.Media.SolidColorBrush(System.Windows.Media.Color.FromRgb(255, 180, 0)),   // 金色
            "A" => new System.Windows.Media.SolidColorBrush(System.Windows.Media.Color.FromRgb(220, 80, 80)),   // 红色
            _ => new System.Windows.Media.SolidColorBrush(System.Windows.Media.Color.FromRgb(100, 100, 100))    // 灰色
        };
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}
