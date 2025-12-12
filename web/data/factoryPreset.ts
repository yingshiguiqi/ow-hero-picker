import { Preset, MapConfiguration, HeroRatingData } from "@/store/useStore";
import { maps } from "@/data/maps";
import { HeroRating } from "@/data/heroes";

const SPECIFIC_CONFIGS: Record<string, { good: string[]; average: string[]; bad: string[] }> = {
  "ilios::ilios_lighthouse": {
    good: ["dva", "lucio", "genji", "ashe", "brigitte", "mercy", "pharah", "winston", "wrecking_ball", "doomfist", "hazard", "echo", "soldier_76", "torbjorn", "tracer", "venture", "sojourn", "freya", "zhanqiu", "ana", "juno", "kiriko", "lifeweaver", "wuyang"],
    average: ["baptiste", "reaper", "mei", "zarya", "sombra", "moira", "symmetra", "widowmaker", "roadhog", "orisa", "ramattra", "mauga", "junker_queen", "reinhardt", "cassidy", "hanzo", "illari"],
    bad: ["junkrat", "sigma", "zenyatta", "bastion"],
  },
  "ilios::ilios_well": {
    good: ["dva", "lucio", "baptiste", "wrecking_ball", "genji", "sombra", "pharah", "roadhog", "sojourn", "freya", "zhanqiu", "ana", "juno", "kiriko", "lifeweaver", "wuyang", "doomfist", "winston", "hazard", "cassidy", "echo", "soldier_76", "torbjorn", "tracer"],
    average: ["reinhardt", "orisa", "reaper", "ashe", "zarya", "moira", "mercy", "brigitte", "symmetra", "mauga", "ramattra", "junker_queen", "hanzo", "venture", "widowmaker", "illari", "zenyatta"],
    bad: ["junkrat", "mei", "sigma", "bastion"],
  },
  "ilios::ilios_ruins": {
    good: ["dva", "orisa", "baptiste", "winston", "torbjorn", "zarya", "pharah", "kiriko", "lifeweaver", "zenyatta", "wuyang", "hanzo", "tracer", "widowmaker", "sojourn", "freya", "zhanqiu", "ana", "juno", "doomfist", "mauga", "ramattra", "wrecking_ball", "junker_queen", "hazard", "echo", "genji"],
    average: ["reinhardt", "lucio", "cassidy", "symmetra", "mei", "mercy", "sombra", "moira", "sigma", "brigitte", "ashe", "junkrat", "venture", "reaper", "illari"],
    bad: ["soldier_76", "roadhog", "bastion"],
  },
  "lijiang::lijiang_market": {
    good: ["orisa", "lucio", "winston", "wrecking_ball", "torbjorn", "ana", "echo", "symmetra", "soldier_76", "zenyatta", "zarya", "sombra", "moira", "pharah", "kiriko", "wuyang", "tracer", "venture", "sojourn", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "doomfist", "mauga", "ramattra", "junker_queen", "hazard", "cassidy", "genji", "mei"],
    average: ["reinhardt", "widowmaker", "roadhog", "mercy", "dva", "ashe", "hanzo", "reaper", "bastion", "junkrat", "lifeweaver", "illari"],
    bad: ["sigma"],
  },
  "lijiang::lijiang_control": {
    good: ["reinhardt", "orisa", "torbjorn", "echo", "symmetra", "zenyatta", "zarya", "moira", "brigitte", "junkrat", "baptiste", "genji", "lucio", "wuyang", "reaper", "tracer", "venture", "sojourn", "freya", "zhanqiu", "juno", "kiriko", "doomfist", "mauga", "ramattra", "junker_queen", "hazard", "bastion", "cassidy", "mei"],
    average: ["winston", "ana", "soldier_76", "roadhog", "sigma", "pharah", "ashe", "illari", "sombra", "hanzo", "mercy"],
    bad: ["wrecking_ball", "widowmaker", "dva", "lifeweaver"],
  },
  "lijiang::lijiang_garden": {
    good: ["dva", "lucio", "brigitte", "mercy", "moira", "wuyang", "tracer", "venture", "sojourn", "freya", "zhanqiu", "juno", "kiriko", "lifeweaver", "doomfist", "winston", "wrecking_ball", "hazard", "echo", "genji", "pharah", "torbjorn"],
    average: ["reinhardt", "orisa", "baptiste", "reaper", "ashe", "mei", "zarya", "sombra", "ramattra", "junker_queen", "mauga", "roadhog", "soldier_76", "cassidy", "symmetra", "ana"],
    bad: ["junkrat", "sigma", "zenyatta", "hanzo", "bastion", "widowmaker", "illari"],
  },
  "antarctic::antarctic_sublevel": {
    good: ["reinhardt", "orisa", "winston", "moira", "pharah", "brigitte", "baptiste", "genji", "reaper", "lucio", "juno", "kiriko", "wuyang", "mei", "symmetra", "tracer", "venture", "sojourn", "freya", "zhanqiu", "ana", "doomfist", "mauga", "ramattra", "zarya", "junker_queen", "hazard", "cassidy", "echo"],
    average: ["roadhog", "sigma", "dva", "ashe", "junkrat", "hanzo", "soldier_76", "torbjorn", "widowmaker", "bastion", "sombra", "mercy", "zenyatta", "illari", "lifeweaver"],
    bad: ["wrecking_ball"],
  },
  "antarctic::antarctic_labs": {
    good: ["reinhardt", "torbjorn", "ana", "symmetra", "pharah", "brigitte", "baptiste", "juno", "kiriko", "lucio", "wuyang", "cassidy", "echo", "mei", "tracer", "venture", "sojourn", "freya", "zhanqiu", "doomfist", "mauga", "ramattra", "winston", "zarya", "junker_queen", "hazard", "ashe"],
    average: ["orisa", "widowmaker", "soldier_76", "zenyatta", "reaper", "genji", "mercy", "sombra", "bastion", "moira", "lifeweaver"],
    bad: ["wrecking_ball", "roadhog", "sigma", "dva", "illari", "hanzo", "junkrat"],
  },
  "antarctic::antarctic_icebreaker": {
    good: ["reinhardt", "orisa", "torbjorn", "ana", "echo", "symmetra", "soldier_76", "zarya", "sombra", "moira", "pharah", "brigitte", "baptiste", "genji", "reaper", "lucio", "wuyang", "mei", "tracer", "venture", "sojourn", "freya", "zhanqiu", "juno", "kiriko", "doomfist", "mauga", "ramattra", "junker_queen", "hazard", "bastion", "cassidy", "junkrat"],
    average: ["wrecking_ball", "roadhog", "zenyatta", "sigma", "ashe", "illari", "lifeweaver"],
    bad: ["winston", "widowmaker", "mercy", "dva", "hanzo"],
  },
  "nepal::nepal_sanctum": {
    good: ["orisa", "winston", "cassidy", "torbjorn", "ana", "widowmaker", "zenyatta", "tracer", "sigma", "pharah", "wuyang", "venture", "sojourn", "freya", "zhanqiu", "baptiste", "juno", "kiriko", "mercy", "doomfist", "mauga", "ramattra", "zarya", "junker_queen", "hazard", "ashe", "hanzo"],
    average: ["reinhardt", "echo", "symmetra", "soldier_76", "roadhog", "moira", "brigitte", "genji", "lucio", "bastion", "junkrat", "lifeweaver"],
    bad: ["wrecking_ball", "sombra", "dva", "reaper", "illari", "mei"],
  },
  "nepal::nepal_shrine": {
    good: ["dva", "orisa", "lucio", "baptiste", "reaper", "cassidy", "wuyang", "freya", "zhanqiu", "ana", "brigitte", "juno", "kiriko", "lifeweaver", "moira", "echo", "genji", "pharah", "soldier_76", "symmetra", "tracer", "venture", "sojourn", "doomfist", "mauga", "ramattra", "winston", "wrecking_ball", "zarya", "junker_queen", "hazard"],
    average: ["reinhardt", "ashe", "junkrat", "sombra", "roadhog", "mei", "torbjorn", "bastion", "mercy", "illari", "zenyatta"],
    bad: ["sigma", "hanzo", "widowmaker"],
  },
  "nepal::nepal_village": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "moira", "wuyang", "echo", "genji", "junkrat", "pharah", "reaper", "symmetra", "torbjorn", "venture", "orisa", "doomfist", "mauga", "ramattra", "winston", "junker_queen", "hazard", "cassidy"],
    average: ["roadhog", "wrecking_ball", "soldier_76", "sombra", "ashe", "bastion", "widowmaker", "hanzo", "mercy", "illari", "zenyatta"],
    bad: ["dva", "sigma"],
  },
  "oasis::oasis_center": {
    good: ["sojourn", "tracer", "kiriko", "lucio", "sombra", "freya", "zhanqiu", "brigitte", "juno", "lifeweaver", "wuyang", "dva", "doomfist", "winston", "wrecking_ball", "echo", "genji", "pharah", "soldier_76"],
    average: ["zarya", "ana", "mauga", "orisa", "hazard", "ramattra", "junker_queen", "ashe", "venture", "torbjorn", "cassidy", "reaper", "baptiste", "mercy", "illari", "zenyatta", "moira"],
    bad: ["reinhardt", "mei", "roadhog", "sigma", "hanzo", "widowmaker", "symmetra", "junkrat", "bastion"],
  },
  "oasis::oasis_gardens": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "lucio", "wuyang", "torbjorn", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "zenyatta", "illari", "hazard", "ashe", "cassidy", "echo", "genji", "pharah", "soldier_76", "sombra", "dva", "orisa", "doomfist", "mauga", "ramattra", "winston", "wrecking_ball", "junker_queen"],
    average: ["reinhardt", "venture", "symmetra", "bastion", "lifeweaver", "mercy", "moira", "widowmaker"],
    bad: ["mei", "roadhog", "sigma", "hanzo", "reaper", "junkrat"],
  },
  "oasis::oasis_university": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "moira", "zenyatta", "wuyang", "echo", "genji", "junkrat", "reaper", "sombra", "symmetra", "torbjorn", "venture", "orisa", "doomfist", "mauga", "ramattra", "junker_queen", "hazard", "bastion", "cassidy"],
    average: ["winston", "roadhog", "soldier_76", "mercy", "pharah", "ashe", "illari", "lifeweaver"],
    bad: ["dva", "sigma", "wrecking_ball", "hanzo", "widowmaker"],
  },
  "samoa::samoa_volcano": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "baptiste", "brigitte", "juno", "zenyatta", "wuyang", "cassidy", "echo", "genji", "sombra", "torbjorn", "venture", "freya", "zhanqiu", "orisa", "doomfist", "mauga", "ramattra", "winston", "junker_queen", "hazard", "ashe"],
    average: ["lucio", "pharah", "soldier_76", "symmetra", "reaper", "moira", "illari", "junkrat"],
    bad: ["reinhardt", "mei", "dva", "wrecking_ball", "roadhog", "sigma", "bastion", "hanzo", "widowmaker", "mercy", "lifeweaver"],
  },
  "samoa::samoa_downtown": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "lucio", "torbjorn", "venture", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "wuyang", "cassidy", "echo", "genji", "pharah", "reaper", "soldier_76", "sombra", "symmetra", "orisa", "doomfist", "mauga", "ramattra", "winston", "wrecking_ball", "junker_queen", "hazard"],
    average: ["reinhardt", "mei", "roadhog", "dva", "ashe", "lifeweaver", "mercy", "hanzo", "illari", "zenyatta", "moira"],
    bad: ["sigma", "widowmaker", "junkrat", "bastion"],
  },
  "samoa::samoa_beach": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "freya", "zhanqiu", "baptiste", "juno", "zenyatta", "illari", "wuyang", "echo", "genji", "hanzo", "pharah", "soldier_76", "torbjorn", "venture", "widowmaker", "orisa", "doomfist", "mauga", "ramattra", "winston", "junker_queen", "hazard", "ashe"],
    average: ["reinhardt", "mei", "lucio", "roadhog", "sigma", "wrecking_ball", "cassidy", "sombra", "lifeweaver", "mercy", "brigitte", "symmetra"],
    bad: ["dva", "reaper", "bastion", "junkrat", "moira"],
  },
  "busan::busan_downtown": {
    good: ["sojourn", "tracer", "ana", "kiriko", "lucio", "baptiste", "brigitte", "juno", "lifeweaver", "mercy", "moira", "wuyang", "pharah", "soldier_76", "sombra", "torbjorn", "venture", "widowmaker", "freya", "zhanqiu", "dva", "doomfist", "winston", "wrecking_ball", "hazard", "cassidy", "echo", "genji"],
    average: ["reinhardt", "zarya", "mei", "orisa", "mauga", "ramattra", "junker_queen", "ashe", "hanzo", "symmetra", "illari", "zenyatta"],
    bad: ["roadhog", "sigma", "reaper", "bastion", "junkrat"],
  },
  "busan::busan_sanctuary": {
    good: ["sojourn", "tracer", "ana", "kiriko", "mercy", "zenyatta", "illari", "wuyang", "hanzo", "soldier_76", "sombra", "widowmaker", "freya", "zhanqiu", "baptiste", "juno", "orisa", "doomfist", "sigma", "wrecking_ball", "hazard", "ashe", "echo", "genji"],
    average: ["lucio", "dva", "winston", "ramattra", "junker_queen", "cassidy", "mauga", "pharah", "symmetra", "torbjorn", "bastion", "venture", "brigitte", "moira", "lifeweaver"],
    bad: ["reinhardt", "zarya", "mei", "roadhog", "reaper", "junkrat"],
  },
  "busan::busan_meka": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio", "zenyatta", "wuyang", "venture", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "moira", "bastion", "cassidy", "genji", "junkrat", "reaper", "sombra", "symmetra", "torbjorn", "orisa", "doomfist", "mauga", "ramattra", "winston", "junker_queen", "hazard", "ashe"],
    average: ["dva", "sigma", "roadhog", "soldier_76", "pharah", "echo", "hanzo", "illari", "mercy"],
    bad: ["wrecking_ball", "lifeweaver"],
  },
  "esperanca": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "zenyatta", "illari", "wuyang", "torbjorn", "venture", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "hazard", "ashe", "cassidy", "echo", "genji", "pharah", "soldier_76", "sombra", "dva", "orisa", "doomfist", "mauga", "ramattra", "winston", "wrecking_ball", "junker_queen"],
    average: ["mei", "lucio", "hanzo", "symmetra", "widowmaker", "mercy", "bastion", "junkrat", "moira"],
    bad: ["reinhardt", "roadhog", "sigma", "reaper"],
  },
  "colosseo": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "zenyatta", "illari", "wuyang", "torbjorn", "venture", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "hazard", "ashe", "cassidy", "echo", "genji", "hanzo", "pharah", "soldier_76", "orisa", "doomfist", "mauga", "ramattra", "sigma", "winston", "wrecking_ball", "junker_queen"],
    average: ["reinhardt", "mei", "lucio", "roadhog", "symmetra", "sombra", "lifeweaver", "mercy", "moira", "bastion"],
    bad: ["dva", "reaper", "junkrat"],
  },
  "new_queen_street": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio", "lifeweaver", "mercy", "zenyatta", "illari", "wuyang", "sombra", "symmetra", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "junker_queen", "hazard", "ashe", "cassidy", "echo", "genji", "pharah", "soldier_76", "dva", "orisa", "doomfist", "mauga", "ramattra", "roadhog", "winston", "wrecking_ball"],
    average: ["torbjorn", "venture", "hanzo", "reaper", "bastion", "junkrat"],
    bad: ["sigma", "moira"],
  },
  "runasapi": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "illari", "wuyang", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "mercy", "zenyatta", "ashe", "echo", "genji", "hanzo", "pharah", "soldier_76", "sombra", "widowmaker", "orisa", "doomfist", "mauga", "ramattra", "sigma", "winston", "wrecking_ball", "hazard"],
    average: ["reinhardt", "mei", "lucio", "cassidy", "roadhog", "junker_queen", "symmetra", "venture", "torbjorn", "bastion"],
    bad: ["dva", "reaper", "junkrat", "moira"],
  },
  "new_junk_city": {
    good: ["zarya", "mei", "sojourn", "tracer", "kiriko", "lucio", "juno", "moira", "wuyang", "reaper", "soldier_76", "symmetra", "torbjorn", "venture", "zhanqiu", "baptiste", "brigitte", "orisa", "doomfist", "mauga", "ramattra", "junker_queen", "hazard", "cassidy", "genji"],
    average: ["reinhardt", "ana", "dva", "roadhog", "sigma", "winston", "freya", "junkrat", "pharah", "echo", "sombra", "lifeweaver", "zenyatta"],
    bad: ["wrecking_ball", "ashe", "bastion", "hanzo", "widowmaker", "illari", "mercy"],
  },
  "suravasa": {
    good: ["sojourn", "tracer", "ana", "kiriko", "lucio", "brigitte", "juno", "wuyang", "genji", "pharah", "soldier_76", "symmetra", "torbjorn", "freya", "zhanqiu", "baptiste", "orisa", "doomfist", "ramattra", "winston", "wrecking_ball", "hazard", "cassidy", "echo"],
    average: ["zarya", "mei", "dva", "mauga", "junker_queen", "ashe", "sombra", "widowmaker", "venture", "lifeweaver", "moira", "illari", "mercy", "zenyatta"],
    bad: ["reinhardt", "roadhog", "sigma", "hanzo", "reaper", "bastion", "junkrat"],
  },
  "throne": {
    good: ["mei", "tracer", "kiriko", "lucio", "brigitte", "juno", "mercy", "moira", "wuyang", "junkrat", "soldier_76", "symmetra", "torbjorn", "venture", "sojourn", "freya", "baptiste", "orisa", "doomfist", "mauga", "ramattra", "wrecking_ball", "hazard", "cassidy", "echo"],
    average: ["zarya", "ana", "dva", "junker_queen", "ashe", "winston", "sombra", "zhanqiu", "widowmaker", "genji", "lifeweaver"],
    bad: ["reinhardt", "roadhog", "sigma", "hanzo", "reaper", "bastion", "pharah", "zenyatta", "illari"],
  },
  "route66::route66_a": {
    good: ["zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio", "mercy", "moira", "zenyatta", "illari", "wuyang", "venture", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "hanzo", "junkrat", "pharah", "reaper", "soldier_76", "sombra", "symmetra", "torbjorn", "wrecking_ball", "junker_queen", "hazard", "ashe", "bastion", "cassidy", "echo", "genji", "dva", "orisa", "doomfist", "mauga", "ramattra", "roadhog", "sigma", "winston"],
    average: ["reinhardt"],
    bad: [],
  },
  "route66::route66_b": {
    good: ["sojourn", "tracer", "ana", "kiriko", "lucio", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "zenyatta", "illari", "wuyang", "genji", "hanzo", "pharah", "soldier_76", "sombra", "symmetra", "widowmaker", "freya", "dva", "doomfist", "winston", "wrecking_ball", "hazard", "ashe", "cassidy", "echo"],
    average: ["zarya", "orisa", "ramattra", "sigma", "junkrat", "torbjorn", "reaper", "mercy", "moira", "venture"],
    bad: ["reinhardt", "mei", "mauga", "junker_queen", "roadhog", "bastion"],
  },
  "route66::route66_c": {
    good: ["zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "zenyatta", "illari", "wuyang", "cassidy", "genji", "hanzo", "soldier_76", "symmetra", "torbjorn", "venture", "widowmaker", "dva", "orisa", "doomfist", "ramattra", "sigma", "winston", "hazard", "ashe"],
    average: ["reinhardt", "mauga", "junker_queen", "reaper", "mercy", "sombra", "junkrat", "bastion", "echo", "moira"],
    bad: ["wrecking_ball", "roadhog", "pharah"],
  },
  "havana::havana_a": {
    good: ["reinhardt", "zarya", "sojourn", "tracer", "ana", "kiriko", "mercy", "zenyatta", "illari", "wuyang", "genji", "hanzo", "pharah", "soldier_76", "widowmaker", "freya", "zhanqiu", "baptiste", "orisa", "mauga", "ramattra", "sigma", "winston", "hazard", "ashe", "echo"],
    average: ["mei", "doomfist", "junker_queen", "wrecking_ball", "symmetra", "torbjorn", "cassidy", "lifeweaver", "juno", "brigitte"],
    bad: ["lucio", "dva", "roadhog", "bastion", "sombra", "venture", "reaper", "moira", "junkrat"],
  },
  "havana::havana_b": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "freya", "zhanqiu", "widowmaker", "baptiste", "brigitte", "juno", "lifeweaver", "zenyatta", "illari", "wuyang", "cassidy", "echo", "genji", "hanzo", "soldier_76", "sombra", "symmetra", "torbjorn", "dva", "orisa", "doomfist", "ramattra", "sigma", "winston", "hazard", "ashe"],
    average: ["reinhardt", "mei", "lucio", "mauga", "junker_queen", "wrecking_ball", "pharah", "reaper", "moira", "mercy"],
    bad: ["roadhog", "venture", "bastion", "junkrat"],
  },
  "havana::havana_c": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "wuyang", "hanzo", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "zenyatta", "illari", "orisa", "mauga", "ramattra", "sigma", "winston", "hazard", "ashe", "genji"],
    average: ["dva", "wrecking_ball", "junker_queen", "doomfist", "pharah", "soldier_76", "echo", "torbjorn", "juno", "sombra", "symmetra", "cassidy", "lifeweaver"],
    bad: ["reinhardt", "mei", "lucio", "roadhog", "venture", "reaper", "bastion", "junkrat", "moira", "mercy"],
  },
  "dorado::dorado_a": {
    good: ["sojourn", "ana", "kiriko", "wuyang", "soldier_76", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "lifeweaver", "mercy", "dva", "winston", "wrecking_ball", "hazard", "ashe", "echo", "genji", "pharah"],
    average: ["reinhardt", "tracer", "orisa", "ramattra", "doomfist", "junker_queen", "symmetra", "cassidy", "venture", "torbjorn", "sombra", "juno", "zenyatta", "illari"],
    bad: ["zarya", "mei", "lucio", "mauga", "roadhog", "sigma", "bastion", "reaper", "hanzo", "junkrat", "moira"],
  },
  "dorado::dorado_b": {
    good: ["sojourn", "ana", "kiriko", "baptiste", "brigitte", "juno", "lifeweaver", "zenyatta", "wuyang", "hanzo", "pharah", "soldier_76", "symmetra", "tracer", "widowmaker", "freya", "zhanqiu", "dva", "orisa", "winston", "wrecking_ball", "hazard", "ashe", "echo", "genji"],
    average: ["zarya", "lucio", "doomfist", "ramattra", "mauga", "sombra", "cassidy", "torbjorn", "mercy", "illari"],
    bad: ["reinhardt", "mei", "roadhog", "sigma", "junker_queen", "venture", "reaper", "bastion", "junkrat", "moira"],
  },
  "dorado::dorado_c": {
    good: ["sojourn", "ana", "kiriko", "lifeweaver", "zenyatta", "wuyang", "soldier_76", "tracer", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "dva", "orisa", "winston", "hazard", "ashe", "cassidy", "echo", "genji"],
    average: ["zarya", "mei", "lucio", "ramattra", "doomfist", "wrecking_ball", "pharah", "torbjorn", "hanzo", "symmetra", "moira", "illari", "sombra", "mercy"],
    bad: ["reinhardt", "mauga", "junker_queen", "roadhog", "sigma", "junkrat", "reaper", "venture", "bastion"],
  },
  "junkertown::junkertown_a": {
    good: ["sojourn", "tracer", "ana", "kiriko", "zhanqiu", "baptiste", "brigitte", "mercy", "zenyatta", "illari", "wuyang", "echo", "genji", "hanzo", "soldier_76", "sombra", "torbjorn", "widowmaker", "freya", "orisa", "doomfist", "ramattra", "sigma", "winston", "wrecking_ball", "hazard", "ashe"],
    average: ["zarya", "mei", "lucio", "dva", "mauga", "roadhog", "venture", "pharah", "cassidy", "symmetra", "junkrat", "juno", "lifeweaver", "moira"],
    bad: ["reinhardt", "bastion", "reaper", "junker_queen"],
  },
  "junkertown::junkertown_b": {
    good: ["sojourn", "tracer", "ana", "kiriko", "baptiste", "brigitte", "zenyatta", "illari", "wuyang", "echo", "genji", "hanzo", "soldier_76", "torbjorn", "widowmaker", "freya", "zhanqiu", "dva", "orisa", "sigma", "winston", "wrecking_ball", "hazard", "ashe", "cassidy"],
    average: ["zarya", "lucio", "doomfist", "ramattra", "junker_queen", "reaper", "symmetra", "venture", "pharah", "sombra", "junkrat", "mercy", "juno", "lifeweaver", "moira"],
    bad: ["reinhardt", "mei", "mauga", "roadhog", "bastion"],
  },
  "junkertown::junkertown_c": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "freya", "zhanqiu", "baptiste", "brigitte", "lifeweaver", "zenyatta", "illari", "wuyang", "ashe", "cassidy", "echo", "genji", "hanzo", "soldier_76", "symmetra", "widowmaker", "dva", "orisa", "doomfist", "ramattra", "sigma", "winston", "wrecking_ball", "hazard"],
    average: ["lucio", "junker_queen", "mauga", "roadhog", "venture", "torbjorn", "junkrat", "reaper", "pharah", "sombra", "juno", "moira", "mercy"],
    bad: ["reinhardt", "mei", "bastion"],
  },
  "circuit_royal::circuit_royal_a": {
    good: ["zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "baptiste", "brigitte", "juno", "lifeweaver", "zenyatta", "illari", "wuyang", "genji", "hanzo", "pharah", "symmetra", "venture", "widowmaker", "freya", "zhanqiu", "orisa", "ramattra", "sigma", "winston", "hazard", "ashe", "cassidy", "echo"],
    average: ["reinhardt", "lucio", "doomfist", "mauga", "dva", "junker_queen", "sombra", "soldier_76", "torbjorn", "mercy", "moira"],
    bad: ["wrecking_ball", "roadhog", "reaper", "bastion", "junkrat"],
  },
  "circuit_royal::circuit_royal_b": {
    good: ["zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "brigitte", "juno", "lifeweaver", "zenyatta", "illari", "wuyang", "hanzo", "pharah", "soldier_76", "torbjorn", "widowmaker", "freya", "zhanqiu", "baptiste", "orisa", "ramattra", "sigma", "winston", "hazard", "ashe", "echo", "genji"],
    average: ["reinhardt", "lucio", "dva", "doomfist", "mauga", "wrecking_ball", "bastion", "cassidy", "symmetra", "sombra", "mercy", "moira"],
    bad: ["junker_queen", "roadhog", "junkrat", "reaper", "venture"],
  },
  "circuit_royal::circuit_royal_c": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "brigitte", "juno", "lifeweaver", "zenyatta", "illari", "wuyang", "baptiste", "echo", "genji", "hanzo", "soldier_76", "symmetra", "widowmaker", "freya", "zhanqiu", "orisa", "mauga", "ramattra", "sigma", "winston", "junker_queen", "hazard", "ashe"],
    average: ["lucio", "dva", "doomfist", "torbjorn", "cassidy", "mercy", "sombra", "bastion", "moira"],
    bad: ["wrecking_ball", "roadhog", "venture", "pharah", "reaper", "junkrat"],
  },
  "watchpoint_gibraltar::watchpoint_gibraltar_a": {
    good: ["tracer", "ana", "kiriko", "soldier_76", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "lifeweaver", "wuyang", "dva", "winston", "wrecking_ball", "ashe", "cassidy", "echo", "genji", "hanzo"],
    average: ["zarya", "sojourn", "orisa", "doomfist", "hazard", "ramattra", "sombra", "torbjorn", "pharah", "illari", "zenyatta", "mercy", "juno"],
    bad: ["reinhardt", "mei", "lucio", "roadhog", "sigma", "mauga", "junker_queen", "symmetra", "venture", "reaper", "bastion", "junkrat", "moira"],
  },
  "watchpoint_gibraltar::watchpoint_gibraltar_b": {
    good: ["ana", "kiriko", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "zenyatta", "wuyang", "dva", "winston", "ashe", "cassidy", "echo", "genji", "hanzo", "soldier_76"],
    average: ["sojourn", "tracer", "wrecking_ball", "hazard", "doomfist", "torbjorn", "pharah", "mercy", "sombra", "reaper", "juno", "lifeweaver", "illari"],
    bad: ["reinhardt", "zarya", "mei", "lucio", "orisa", "mauga", "ramattra", "junker_queen", "sigma", "roadhog", "venture", "symmetra", "bastion", "junkrat", "moira"],
  },
  "watchpoint_gibraltar::watchpoint_gibraltar_c": {
    good: ["reinhardt", "zarya", "sojourn", "tracer", "ana", "kiriko", "zenyatta", "illari", "wuyang", "symmetra", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "ashe", "cassidy", "echo", "genji", "hanzo", "pharah", "soldier_76", "sombra", "dva", "orisa", "doomfist", "ramattra", "sigma", "winston", "wrecking_ball", "hazard"],
    average: ["mei", "lucio", "mauga", "junker_queen", "roadhog", "venture", "torbjorn", "reaper", "bastion", "moira", "mercy"],
    bad: ["junkrat"],
  },
  "rialto::rialto_a": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio"],
    average: [],
    bad: [],
  },
  "rialto::rialto_b": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio"],
    average: [],
    bad: [],
  },
  "rialto::rialto_c": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio"],
    average: [],
    bad: [],
  },
  "shambali::shambali_a": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio"],
    average: [],
    bad: [],
  },
  "shambali::shambali_b": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio"],
    average: [],
    bad: [],
  },
  "shambali::shambali_c": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio"],
    average: [],
    bad: [],
  },
  "midtown::midtown_a": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "pharah", "orisa", "widowmaker", "freya", "zhanqiu", "brigitte", "lifeweaver", "zenyatta", "wuyang", "ramattra", "sigma", "hazard", "ashe", "echo", "genji", "hanzo", "torbjorn"],
    average: ["mei", "junker_queen", "winston", "doomfist", "soldier_76", "mauga", "cassidy", "symmetra", "sombra", "venture", "illari", "mercy", "baptiste", "juno"],
    bad: ["reinhardt", "lucio", "wrecking_ball", "dva", "roadhog", "reaper", "bastion", "junkrat", "moira"],
  },
  "midtown::midtown_b": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "zenyatta", "wuyang", "genji", "torbjorn", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "lifeweaver", "orisa", "doomfist", "ramattra", "sigma", "winston", "hazard", "ashe", "echo"],
    average: ["mei", "lucio", "dva", "mauga", "junker_queen", "soldier_76", "venture", "pharah", "hanzo", "cassidy", "sombra", "illari", "juno", "junkrat", "symmetra"],
    bad: ["reinhardt", "wrecking_ball", "roadhog", "reaper", "bastion", "mercy", "moira"],
  },
  "midtown::midtown_c": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "soldier_76", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "zenyatta", "wuyang", "orisa", "ramattra", "sigma", "winston", "hazard", "ashe", "echo", "genji"],
    average: ["lucio", "dva", "doomfist", "mauga", "junker_queen", "pharah", "symmetra", "torbjorn", "hanzo", "cassidy", "illari", "lifeweaver", "juno"],
    bad: ["reinhardt", "mei", "reaper", "wrecking_ball", "roadhog", "venture", "sombra", "bastion", "junkrat", "mercy", "moira"],
  },
  "numbani::numbani_a": {
    good: ["tracer", "ana", "kiriko", "zhanqiu", "brigitte", "mercy", "wuyang", "dva", "doomfist", "winston", "wrecking_ball", "echo", "genji", "pharah", "freya"],
    average: ["sojourn", "lucio", "hazard", "soldier_76", "torbjorn", "symmetra", "hanzo", "cassidy", "ashe", "baptiste", "juno", "lifeweaver"],
    bad: ["reinhardt", "zarya", "mei", "orisa", "ramattra", "junker_queen", "mauga", "roadhog", "sigma", "venture", "reaper", "sombra", "widowmaker", "bastion", "junkrat", "illari", "moira", "zenyatta"],
  },
  "numbani::numbani_b": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "zenyatta", "wuyang", "cassidy", "echo", "genji", "pharah", "soldier_76", "symmetra", "widowmaker", "freya", "dva", "orisa", "doomfist", "ramattra", "winston", "wrecking_ball", "hazard", "ashe"],
    average: ["reinhardt", "lucio", "mauga", "junker_queen", "roadhog", "sigma", "sombra", "bastion", "venture", "torbjorn", "hanzo", "mercy", "illari", "moira"],
    bad: ["mei", "reaper", "junkrat"],
  },
  "numbani::numbani_c": {
    good: ["reinhardt", "zarya", "sojourn", "tracer", "ana", "kiriko", "baptiste", "brigitte", "zenyatta", "wuyang", "ashe", "bastion", "echo", "genji", "torbjorn", "widowmaker", "freya", "zhanqiu", "orisa", "mauga", "ramattra", "roadhog", "sigma", "winston", "junker_queen", "hazard"],
    average: ["lucio", "doomfist", "dva", "wrecking_ball", "soldier_76", "pharah", "hanzo", "symmetra", "cassidy", "lifeweaver", "mercy", "juno", "illari", "moira"],
    bad: ["mei", "venture", "reaper", "sombra", "junkrat"],
  },
  "kings_row::kings_row_a": {
    good: ["mei", "sojourn", "tracer", "ana", "kiriko", "lucio", "baptiste", "brigitte", "juno", "lifeweaver", "mercy", "zenyatta", "illari", "wuyang", "soldier_76", "sombra", "symmetra", "torbjorn", "venture", "widowmaker", "freya", "zhanqiu", "hazard", "ashe", "cassidy", "echo", "genji", "hanzo", "pharah", "reaper", "orisa", "doomfist", "mauga", "ramattra", "reinhardt", "winston", "zarya", "junker_queen"],
    average: ["dva", "wrecking_ball", "roadhog", "sigma", "moira", "junkrat", "bastion"],
    bad: [],
  },
  "kings_row::kings_row_b": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio", "illari", "wuyang", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "mercy", "moira", "zenyatta", "reaper", "soldier_76", "sombra", "symmetra", "torbjorn", "venture", "widowmaker", "freya", "hazard", "ashe", "cassidy", "echo", "genji", "hanzo", "junkrat", "pharah", "dva", "orisa", "doomfist", "mauga", "ramattra", "winston", "wrecking_ball", "junker_queen"],
    average: ["roadhog", "sigma", "bastion"],
    bad: [],
  },
  "kings_row::kings_row_c": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio", "lifeweaver", "zenyatta", "wuyang", "symmetra", "torbjorn", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "junker_queen", "hazard", "ashe", "cassidy", "genji", "hanzo", "reaper", "soldier_76", "dva", "orisa", "doomfist", "mauga", "ramattra", "roadhog", "sigma", "winston"],
    average: ["wrecking_ball", "echo", "venture", "pharah", "sombra", "bastion", "junkrat", "mercy", "illari", "moira"],
    bad: [],
  },
  "hollywood::hollywood_a": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "lucio", "juno", "lifeweaver", "zenyatta", "wuyang", "sombra", "symmetra", "torbjorn", "venture", "freya", "zhanqiu", "baptiste", "brigitte", "hazard", "ashe", "cassidy", "echo", "genji", "hanzo", "pharah", "soldier_76", "dva", "orisa", "doomfist", "mauga", "ramattra", "winston", "wrecking_ball", "junker_queen"],
    average: ["reinhardt", "mei", "roadhog", "reaper", "sigma", "moira", "mercy", "widowmaker", "illari"],
    bad: ["bastion", "junkrat"],
  },
  "hollywood::hollywood_b": {
    good: ["sojourn", "tracer", "ana", "kiriko", "lucio", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "illari", "wuyang", "hanzo", "pharah", "soldier_76", "sombra", "symmetra", "torbjorn", "widowmaker", "freya", "dva", "doomfist", "winston", "wrecking_ball", "hazard", "ashe", "echo", "genji"],
    average: ["zarya", "orisa", "ramattra", "venture", "cassidy", "zenyatta", "mercy"],
    bad: ["reinhardt", "mei", "roadhog", "sigma", "mauga", "junker_queen", "junkrat", "reaper", "bastion", "moira"],
  },
  "hollywood::hollywood_c": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "lucio", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "zenyatta", "wuyang", "cassidy", "echo", "genji", "hanzo", "soldier_76", "torbjorn", "widowmaker", "freya", "dva", "orisa", "doomfist", "ramattra", "sigma", "winston", "hazard", "ashe"],
    average: ["reinhardt", "mauga", "junker_queen", "roadhog", "symmetra", "venture", "illari", "mercy", "sombra", "moira"],
    bad: ["mei", "wrecking_ball", "pharah", "reaper", "junkrat", "bastion"],
  },
  "blizzard_world::blizzard_world_a": {
    good: ["zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio", "brigitte", "juno", "lifeweaver", "zenyatta", "illari", "wuyang", "sombra", "symmetra", "torbjorn", "venture", "widowmaker", "freya", "zhanqiu", "baptiste", "hazard", "ashe", "cassidy", "echo", "genji", "hanzo", "pharah", "soldier_76", "dva", "orisa", "doomfist", "mauga", "ramattra", "winston", "wrecking_ball", "junker_queen"],
    average: ["reinhardt", "roadhog", "sigma", "mercy", "moira"],
    bad: ["reaper", "junkrat", "bastion"],
  },
  "blizzard_world::blizzard_world_b": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "lucio", "illari", "wuyang", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "zenyatta", "ashe", "cassidy", "echo", "genji", "hanzo", "pharah", "soldier_76", "torbjorn", "dva", "orisa", "doomfist", "mauga", "ramattra", "winston", "wrecking_ball", "hazard"],
    average: ["reinhardt", "roadhog", "sigma", "junker_queen", "sombra", "mercy", "moira", "symmetra", "venture"],
    bad: ["mei", "reaper", "bastion", "junkrat"],
  },
  "blizzard_world::blizzard_world_c": {
    good: ["zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio", "widowmaker", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "zenyatta", "wuyang", "cassidy", "genji", "hanzo", "pharah", "soldier_76", "symmetra", "torbjorn", "venture", "orisa", "doomfist", "mauga", "ramattra", "sigma", "winston", "hazard", "ashe"],
    average: ["reinhardt", "wrecking_ball", "junker_queen", "bastion", "echo", "sombra", "lifeweaver", "mercy", "moira", "illari"],
    bad: ["roadhog", "dva", "reaper", "junkrat"],
  },
  "eichenwalde::eichenwalde_a": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio", "zenyatta", "illari", "wuyang", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "mercy", "moira", "pharah", "reaper", "soldier_76", "sombra", "symmetra", "torbjorn", "venture", "widowmaker", "hazard", "ashe", "bastion", "cassidy", "echo", "genji", "hanzo", "junkrat", "orisa", "doomfist", "mauga", "ramattra", "roadhog", "winston", "wrecking_ball", "junker_queen"],
    average: ["dva", "sigma"],
    bad: [],
  },
  "eichenwalde::eichenwalde_b": {
    good: ["sojourn", "tracer", "ana", "kiriko", "lucio", "illari", "wuyang", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "lifeweaver", "moira", "zenyatta", "genji", "junkrat", "pharah", "reaper", "soldier_76", "sombra", "torbjorn", "widowmaker", "dva", "doomfist", "winston", "wrecking_ball", "hazard", "ashe", "cassidy", "echo"],
    average: ["zarya", "mei", "orisa", "ramattra", "mauga", "junker_queen", "symmetra", "venture", "hanzo", "bastion", "mercy"],
    bad: ["reinhardt", "sigma", "roadhog"],
  },
  "eichenwalde::eichenwalde_c": {
    good: ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio", "juno", "moira", "zenyatta", "wuyang", "soldier_76", "symmetra", "torbjorn", "venture", "freya", "zhanqiu", "baptiste", "brigitte", "hazard", "ashe", "bastion", "cassidy", "genji", "hanzo", "junkrat", "reaper", "orisa", "doomfist", "mauga", "ramattra", "roadhog", "sigma", "winston", "junker_queen"],
    average: ["sombra", "widowmaker", "mercy", "lifeweaver", "illari"],
    bad: ["wrecking_ball", "dva", "echo", "pharah"],
  },
  "paraiso::paraiso_a": {
    good: ["sojourn", "tracer", "ana", "kiriko", "lucio", "juno", "lifeweaver", "illari", "wuyang", "hanzo", "pharah", "soldier_76", "torbjorn", "freya", "zhanqiu", "baptiste", "brigitte", "dva", "doomfist", "winston", "wrecking_ball", "hazard", "ashe", "echo", "genji"],
    average: ["zarya", "orisa", "ramattra", "cassidy", "venture", "zenyatta", "reaper", "sombra", "widowmaker", "symmetra", "mercy", "moira"],
    bad: ["reinhardt", "mei", "mauga", "roadhog", "sigma", "junker_queen", "bastion", "junkrat"],
  },
  "paraiso::paraiso_b": {
    good: ["sojourn", "tracer", "ana", "kiriko", "lucio", "lifeweaver", "wuyang", "hanzo", "soldier_76", "torbjorn", "freya", "zhanqiu", "baptiste", "brigitte", "juno", "dva", "doomfist", "winston", "wrecking_ball", "hazard", "ashe", "echo", "genji"],
    average: ["zarya", "orisa", "ramattra", "venture", "pharah", "cassidy", "reaper", "symmetra", "sombra", "junkrat", "widowmaker", "mercy", "illari", "moira", "zenyatta"],
    bad: ["reinhardt", "mei", "mauga", "junker_queen", "sigma", "roadhog", "bastion"],
  },
  "paraiso::paraiso_c": {
    good: ["zarya", "sojourn", "tracer", "ana", "kiriko", "lucio", "baptiste", "brigitte", "juno", "lifeweaver", "zenyatta", "wuyang", "genji", "hanzo", "soldier_76", "symmetra", "torbjorn", "venture", "freya", "zhanqiu", "orisa", "doomfist", "mauga", "ramattra", "winston", "hazard", "ashe", "cassidy"],
    average: ["reinhardt", "mei", "junker_queen", "sigma", "roadhog", "dva", "echo", "reaper", "sombra", "widowmaker", "junkrat", "illari", "mercy", "moira"],
    bad: ["wrecking_ball", "pharah", "bastion"],
  },
};

const UNIVERSAL_GOOD_IDS = ["reinhardt", "zarya", "mei", "sojourn", "tracer", "ana", "kiriko", "lucio"];

function buildRatings(good: string[], average: string[], bad: string[]): HeroRatingData[] {
  const ratings: HeroRatingData[] = [];
  good.forEach((id) => ratings.push({ heroId: id, rating: HeroRating.GOOD }));
  average.forEach((id) => ratings.push({ heroId: id, rating: HeroRating.AVERAGE }));
  bad.forEach((id) => ratings.push({ heroId: id, rating: HeroRating.BAD }));
  return ratings;
}

function buildConfigForAllMaps(): MapConfiguration[] {
  const defaultRatings = UNIVERSAL_GOOD_IDS.map((id) => ({ heroId: id, rating: HeroRating.GOOD }));
  const cfgs: MapConfiguration[] = [];

  for (const m of maps) {
    if (m.subMaps && m.subMaps.length > 0) {
      for (const sm of m.subMaps) {
        const key = `${m.id}::${sm.id}`;
        const specific = SPECIFIC_CONFIGS[key];
        if (specific) {
          cfgs.push({
            mapId: m.id,
            subMapId: sm.id,
            heroRatings: buildRatings(specific.good, specific.average, specific.bad),
          });
        } else {
          cfgs.push({ mapId: m.id, subMapId: sm.id, heroRatings: defaultRatings });
        }
      }
    } else {
      const key = m.id;
      const specific = SPECIFIC_CONFIGS[key];
      if (specific) {
        cfgs.push({ mapId: m.id, heroRatings: buildRatings(specific.good, specific.average, specific.bad) });
      } else {
        cfgs.push({ mapId: m.id, heroRatings: defaultRatings });
      }
    }
  }
  return cfgs;
}

export function createFactoryPreset(): Preset {
  const now = new Date();
  return {
    id: `factory-${now.getTime()}`,
    name: "出厂预设 v2",
    configurations: buildConfigForAllMaps(),
    createdAt: now,
    updatedAt: now,
  };
}
