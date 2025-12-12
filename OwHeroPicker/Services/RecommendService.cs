using System.Collections.ObjectModel;
using OwHeroPicker.Data;
using OwHeroPicker.Models;

namespace OwHeroPicker.Services;

public class RecommendService
{
    /// <summary>
    /// 分析阵容
    /// </summary>
    public TeamAnalysis AnalyzeTeam(ObservableCollection<string?> myTeam, ObservableCollection<string?> enemyTeam)
    {
        var analysis = new TeamAnalysis();
        var myHeroes = myTeam.Where(h => h != null).Select(h => HeroData.GetHeroById(h!)).Where(h => h != null).ToList();

        if (myHeroes.Count == 0)
        {
            analysis.OverallScore = 0;
            analysis.Issues.Add("阵容为空");
            return analysis;
        }

        // 统计角色
        analysis.TankCount = myHeroes.Count(h => h!.Role == HeroRole.Tank);
        analysis.DamageCount = myHeroes.Count(h => h!.Role == HeroRole.Damage);
        analysis.SupportCount = myHeroes.Count(h => h!.Role == HeroRole.Support);

        // 检测问题
        if (analysis.TankCount == 0) analysis.Issues.Add("缺少坦克");
        if (analysis.SupportCount == 0) analysis.Issues.Add("缺少治疗");
        if (analysis.SupportCount == 1) analysis.Issues.Add("治疗不足，建议双奶");
        if (analysis.DamageCount > 3) analysis.Issues.Add("输出过多");

        // 计算克制分数
        int counterScore = 0;
        var enemyHeroes = enemyTeam.Where(h => h != null).ToList();
        
        foreach (var myHero in myHeroes)
        {
            // 检查我方英雄克制了多少敌方英雄
            var strengths = CounterData.GetStrengths(myHero!.Id);
            foreach (var enemyId in enemyHeroes)
            {
                if (strengths.Any(s => s.Hero.Id == enemyId))
                {
                    counterScore += 10;
                }
            }
            // 检查我方英雄被多少敌方英雄克制
            var weaknesses = CounterData.GetWeaknesses(myHero!.Id);
            foreach (var enemyId in enemyHeroes)
            {
                if (weaknesses.Any(w => w.Hero.Id == enemyId))
                {
                    counterScore -= 5;
                }
            }
        }

        // 计算总分
        int baseScore = 50;
        baseScore += analysis.TankCount >= 1 ? 10 : -10;
        baseScore += analysis.SupportCount >= 2 ? 15 : (analysis.SupportCount >= 1 ? 5 : -15);
        baseScore += counterScore * 3;
        baseScore = Math.Clamp(baseScore, 0, 100);

        analysis.OverallScore = baseScore;

        // 生成推荐
        analysis.Recommendations = GetRecommendations(myTeam, enemyTeam);

        return analysis;
    }

    /// <summary>
    /// 获取英雄推荐
    /// </summary>
    public List<HeroRecommendation> GetRecommendations(ObservableCollection<string?> myTeam, ObservableCollection<string?> enemyTeam)
    {
        var recommendations = new List<HeroRecommendation>();
        var myHeroIds = myTeam.Where(h => h != null).ToHashSet();
        var enemyHeroIds = enemyTeam.Where(h => h != null).ToList();

        // 统计当前角色
        var myHeroes = myHeroIds.Select(h => HeroData.GetHeroById(h!)).Where(h => h != null).ToList();
        int tankCount = myHeroes.Count(h => h!.Role == HeroRole.Tank);
        int supportCount = myHeroes.Count(h => h!.Role == HeroRole.Support);

        foreach (var hero in HeroData.Heroes)
        {
            if (myHeroIds.Contains(hero.Id)) continue;

            int score = 0;
            string reason = "";

            // 角色需求加分
            if (tankCount == 0 && hero.Role == HeroRole.Tank)
            {
                score += 20;
                reason = "阵容缺少坦克";
            }
            else if (supportCount < 2 && hero.Role == HeroRole.Support)
            {
                score += 15;
                reason = "阵容需要治疗";
            }

            // 克制加分 - 检查该英雄能克制多少敌方英雄
            var strengths = CounterData.GetStrengths(hero.Id);
            foreach (var enemyId in enemyHeroIds)
            {
                if (strengths.Any(s => s.Hero.Id == enemyId))
                {
                    score += 15;
                    if (string.IsNullOrEmpty(reason))
                    {
                        var enemy = HeroData.GetHeroById(enemyId!);
                        reason = $"克制{enemy?.Name}";
                    }
                }
            }

            if (score > 0)
            {
                recommendations.Add(new HeroRecommendation
                {
                    Hero = hero,
                    Score = score,
                    Reason = reason
                });
            }
        }

        return recommendations.OrderByDescending(r => r.Score).Take(5).ToList();
    }

    /// <summary>
    /// 获取英雄的克制关系
    /// </summary>
    public (List<CounterInfo> Strengths, List<CounterInfo> Weaknesses) GetCounterRelations(string heroId)
    {
        var strengths = CounterData.GetStrengths(heroId);
        var weaknesses = CounterData.GetWeaknesses(heroId);

        return (strengths, weaknesses);
    }
}
