


import 'dart:convert';
import 'dart:io';

Future<void> main() async {
  await getMonsterBreedingData();
  //getMonsterNames();
}

Future<void> getMonsterBreedingData() async {
  var lib = DWMLibrary();
  String str = new JsonEncoder.withIndent('  ').convert(lib);
  File output = new File('output.json');
  output.writeAsStringSync(str);
}


void getMonsterNames() {
  var file = new File('recipes.txt');
  var lines = file.readAsLinesSync();
  Set<String> monsters = new Set<String>();
  for (String line in lines) {
    if (line.contains(',')) {
      var name = line.split(',')[0];
      monsters.add(name);
    }
  }

  print(monsters.join(',\n'));
}


class Monster {
  final String name;
  String family = '';
  final List<Recipe> recipes = [];
  final List<Recipe> asBase = [];
  final List<Recipe> asMate = [];

  Monster(this.name);

  @override
  bool operator==(Object other) {
    if (other is Monster) {
      if (other.name == this.name) {
        return true;
      }
    }

    return false;
  }

  Map<String, dynamic> toJson() => this.toMap();
  Map<String, dynamic> toMap() {
    return {
      'name': this.name,
      'family': this.family,
      'recipes': this.recipes,
      'asBase': this.asBase,
      'asMate': this.asMate
    };
  }
}

class Recipe {
  final String base;
  final String mate;
  final String result;
  final String req;

  Recipe(this.base, this.mate, this.result, {this.req=''});

  Map<String, dynamic> toJson() => this.toMap();
  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = {
      'result': result,
      'base': base,
      'mate': mate,
    };

    if (req != '') {
      map['req'] = req;
    }

    return map;
  }
}

class DWMLibrary {

  Set<Monster> monsters = {};

  DWMLibrary() {
    _augmentRecipes();

    _augmentFamilies();
  }

  Map<String, dynamic> toJson() => this.toMap();
  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = new Map<String, dynamic>();
    this.monsters.forEach((x) => map.putIfAbsent(x.name, () => x));
    return {
      'monsters': this.monsters.toList(),
    };
  }

  Monster getByName(String name) {
    for (var monster in monsters) {
      if (monster.name == name) {
        return monster;
      }
    }

    throw new Exception('could not find $name');
  }

  bool hasByName(String name) {
    for (var monster in monsters) {
      if (monster.name == name) {
        return true;
      }
    }

    return false;
  }


  void _augmentFamilies() {
    File familyFile = new File('families.txt');
    List<String> lines = familyFile.readAsLinesSync();
    for (String line in lines) {
      var parts = line.split(',');
      var name = parts[0];
      var family = parts[1];
      if (hasByName(name)) {
        var monster = getByName(name);
        monster.family = family;
      } else {
        var monster = new Monster(name);
        monster.family = family;
        monsters.add(monster);
      }
    }
  }

  void _augmentRecipes() {
    File breedingGuideFile = new File('recipes.txt');
    List<String> lines = breedingGuideFile.readAsLinesSync();

    for (String line in lines) {
      if (_lineIsRecipe(line)) {
        _parseLineAndUpdateMap(line);
      }
    }
  }

  void _parseLineAndUpdateMap(String line) {
    Recipe rec = _recipeFromLine(line);

    // update result
    Monster res;
    if (hasByName(rec.result)) {
      res = getByName(rec.result);
    }
    else {
      res = new Monster(rec.result);
      monsters.add(res);
    }
    res.recipes.add(rec);

    // update base
    if (!_monsterIsFamily(rec.base)) {
      Monster base;
      if (hasByName(rec.base)) {
        base = getByName(rec.base);
      }
      else {
        base = new Monster(rec.base);
        monsters.add(base);
      }
      base.asBase.add(rec);
    }

    // update mate
    if (!_monsterIsFamily(rec.mate)) {
      Monster mate;
      if (hasByName(rec.mate)) {
        mate = getByName(rec.mate);
      }
      else {
        mate = new Monster(rec.mate);
        monsters.add(mate);
      }
      mate.asMate.add(rec);
    }
  }

  bool _lineIsRecipe(String line) {
    return line.contains(',');
  }

  Recipe _recipeFromLine(String line) {
    List<String> parts = line.split(',');
    if (parts.length == 3) {
      return new Recipe(
          parts[1],
          parts[2],
          parts[0]
      );
    }
    else {
      return new Recipe(
          parts[1],
          parts[2],
          parts[0],
          req: parts[3]
      );
    }
  }

  bool _monsterIsFamily(String name) {
    return name.contains('Family');
  }
}