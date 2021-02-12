


import 'dart:convert';
import 'dart:io';

Future<void> main() async {
  await getMonsterBreedingData();
  //getMonsterNames();
}

Future<void> getMonsterBreedingData() async {
  var lib = DWMLibrary();
  print(lib.taraRecipeTrees['DarkDrium']!.printTree());
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

  final Set<String> locations = new Set();
  final Set<String> cobiLocations = new Set();
  final Set<String> taraLocations = new Set();

  List<String> skills = [];
  int maxLevel = 0;
  int experience = 0;
  int hp = 0;
  int mp = 0;
  int attack = 0;
  int defence = 0;
  int agility = 0;
  int intelligence = 0;

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
      'asMate': this.asMate,
      'skills': this.skills,
      'maxLevel': this.maxLevel,
      'experience': this.experience,
      'hp': this.hp,
      'mp': this.mp,
      'attack': this.attack,
      'defence': this.defence,
      'agility': this.agility,
      'intelligence': this.intelligence,
      'locations': this.locations.toList(),
      'cobiLocations': this.cobiLocations.toList(),
      'taraLocations': this.taraLocations.toList(),
    };
  }
}

class Recipe {
  final String base;
  final String mate;
  final String result;
  final String req;

  Recipe(this.base, this.mate, this.result, {this.req=''});

  String toEquation() => '$base + $mate = $result';

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


class RecipeTreeNode {
  final String name;
  final RecipeTreeNode? base;
  final RecipeTreeNode? mate;
  RecipeTreeNode(this.name, this.base, this.mate);

  bool isLeaf() {
    return this.base == null && this.mate == null;
  }

  Map<String, dynamic> toJson() => this.toMap();
  Map<String, dynamic> toMap() => {
    'name': name,
    'base': base,
    'mate': mate,
  };

  String printTree({int level=0}) {

    String padding = '';
    for (int i = 0; i < level; i++) {
      padding+='  ';
    }

    if (isLeaf()) {
      return '$padding$name';
    }

    String res ='$padding$name\n${base!.printTree(level: level+1)}\n${mate!.printTree(level: level+1)}';

    return res;
  }
}

class DWMLibrary {

  Set<Monster> monsters = {};

  Set<String> monstersFoundInCobiVersion = {};
  Set<String> monstersFoundInTaraVersion = {};

  Map<String, RecipeTreeNode> taraRecipeTrees = {};
  Map<String, RecipeTreeNode> cobiRecipeTrees = {};

  DWMLibrary() {
    _augmentRecipes();

    _augmentFamilies();

    _augmentStatsSkills();

    //_augmentResistances();

    _augmentLocations();

    _augmentRecipeTree();
  }

  Map<String, dynamic> toJson() => this.toMap();
  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = new Map<String, dynamic>();
    this.monsters.forEach((x) => map.putIfAbsent(x.name, () => x));
    return {
      'monsters': this.monsters.toList(),
      'monstersFoundInCobiVersion': monstersFoundInCobiVersion.toList(),
      'monstersFoundInTaraVersion': monstersFoundInTaraVersion.toList(),
      'taraRecipeTrees': taraRecipeTrees,
      'cobiRecipeTrees': cobiRecipeTrees,
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

  void _augmentStatsSkills() {
    File file = new File('statsskills.txt');
    List<String> lines = file.readAsLinesSync();

    for (String line in lines) {
      if (line.length > 0) {
        var parts = line.split(',');
        String name = parts[0];
        int ml = int.parse(parts[1]);
        int ep = int.parse(parts[2]);
        int hp = int.parse(parts[3]);
        int mp = int.parse(parts[4]);
        int at = int.parse(parts[5]);
        int df = int.parse(parts[6]);
        int ag = int.parse(parts[7]);
        int inte = int.parse(parts[8]);
        List<String> skills = [parts[9], parts[10], parts[11]];
        
        Monster res;
        if (hasByName(name)) {
          res = getByName(name);
        }
        else {
          res = new Monster(name);
          monsters.add(res);
        }

        res.maxLevel = ml;
        res.experience = ep;
        res.hp = hp;
        res.mp = mp;
        res.attack = at;
        res.defence = df;
        res.agility = ag;
        res.intelligence = inte;
        res.skills = skills;
      }
    }
  }

  void _augmentResistances() {

  }

  void _augmentLocations() {
    File file = new File('locations.txt');
    List<String> lines = file.readAsLinesSync();

    for (String line in lines) {
      var parts = line.split(',');
      String name = parts[0];
      String loc = parts[1];
      if (parts.length == 2) {
        Monster res;
        if (hasByName(name)) {
          res = getByName(name);
        }
        else {
          throw new Exception('monster not found: $name');
          // res = new Monster(name);
          // monsters.add(res);
        }

        monstersFoundInTaraVersion.add(name);
        monstersFoundInCobiVersion.add(name);
        res.locations.add(loc);
      }
      else if (parts.length == 3) {
        Monster res;
        if (hasByName(name)) {
          res = getByName(name);
        }
        else {
          throw new Exception('monster not found: $name');
          // res = new Monster(name);
          // monsters.add(res);
        }

        String version = parts[2];
        if (version == 'Cobi') {
          monstersFoundInCobiVersion.add(name);
          res.cobiLocations.add(loc);
        }
        else if (version == 'Tara') {
          monstersFoundInTaraVersion.add(name);
          res.taraLocations.add(loc);
        }
        else {
          throw Exception('Error when parsing locations: $line');
        }
      }
      else {
        throw Exception('error when parsing locations file: $line');
      }
    }
  }

  void _augmentRecipeTree() {
    _buildRecipeTree(true);
    _buildRecipeTree(false);
  }

  void _buildRecipeTree(bool isTara) {
    taraRecipeTrees.putIfAbsent('Warubou', () => new RecipeTreeNode('Warubou', null, null));
    taraRecipeTrees.putIfAbsent('Watabou', () => new RecipeTreeNode('Watabou', null, null));
    taraRecipeTrees.putIfAbsent('Darck', () => new RecipeTreeNode('Darck', null, null));
    cobiRecipeTrees.putIfAbsent('Warubou', () => new RecipeTreeNode('Warubou', null, null));
    cobiRecipeTrees.putIfAbsent('Watabou', () => new RecipeTreeNode('Watabou', null, null));
    cobiRecipeTrees.putIfAbsent('Darck', () => new RecipeTreeNode('Darck', null, null));
    cobiRecipeTrees.putIfAbsent('BigRoost', () => new RecipeTreeNode('BigRoost', null, null));

    for (var mon in monsters) {

      if (mon.name == 'Warubou' || mon.name == 'Watabou') {
        continue;
      }

      var node = getRecipeTreeForMonster(mon.name, 0, mon.name, isTara);
      if (isTara) {
        taraRecipeTrees.putIfAbsent(mon.name, () => node);
      }
      else {
        cobiRecipeTrees.putIfAbsent(mon.name, () => node);
      }
    }
  }

  RecipeTreeNode getRecipeTreeForMonster(String root, int level, String name, bool isTara) {
    print('Building tree for $name, $isTara');

    if (root == name && level > 0) {
      throw new Exception('we recursed somehow... at $name, $level');
    }

    // if it is a family
    if (_monsterIsFamily(name)) {
      return new RecipeTreeNode(name, null, null);
    }
    
    // then check if we already built this tree
    if (isTara) {
      if (taraRecipeTrees.containsKey(name)) {
        return taraRecipeTrees[name]!;
      }
    }

    if (!isTara) {
      if (cobiRecipeTrees.containsKey(name)) {
        return cobiRecipeTrees[name]!;
      }
    }

    // then check if we dont have to build a tree
    if ((isTara && monstersFoundInTaraVersion.contains(name))
      || (!isTara && monstersFoundInCobiVersion.contains(name))) {
      return new RecipeTreeNode(name, null, null);
    }

    var monster = getByName(name);
    if (monster.recipes.isEmpty) {
      throw new Exception('This monster has no locations and no recipes: $name');
    }

    // not sure which recipe to choose... for now just go with first
    List<Recipe> bestRecipe = [];
    List<Recipe> betterRecipe = [];
    List<Recipe> fallbackRecipe = [];
    for (var recipe in monster.recipes) {
      // if this monster has a recipe where both can be found in worlds,
      // that is preferred
      bool isFamilyOrFoundInTaraBase = (_monsterIsFamily(recipe.base) || monstersFoundInTaraVersion.contains(recipe.base));
      bool isFamilyOrFoundInTaraMate = (_monsterIsFamily(recipe.mate) || monstersFoundInTaraVersion.contains(recipe.mate));
      
      bool isFamilyOrFoundInCobiBase = (_monsterIsFamily(recipe.base) || monstersFoundInCobiVersion.contains(recipe.base));
      bool isFamilyOrFoundInCobiMate = (_monsterIsFamily(recipe.mate) || monstersFoundInCobiVersion.contains(recipe.mate));
      // if ((_monsterIsFamily(recipe.base) || ((isTara && monstersFoundInTaraVersion.contains(recipe.base))
      //     || (!isTara && monstersFoundInCobiVersion.contains(recipe.base))))
      //   && (_monsterIsFamily(recipe.mate) || ((isTara && monstersFoundInTaraVersion.contains(recipe.mate))
      //     || (!isTara && monstersFoundInCobiVersion.contains(recipe.mate)))))
      if ((isTara && (isFamilyOrFoundInTaraBase && isFamilyOrFoundInTaraMate))
      || (!isTara && (isFamilyOrFoundInCobiBase && isFamilyOrFoundInCobiMate)))
      {
        bestRecipe.add(recipe);
        continue;
      }


      // next best would be where at least one is found in worlds
      // if (((isTara && monstersFoundInTaraVersion.contains(recipe.base))
      //     || (!isTara && monstersFoundInCobiVersion.contains(recipe.base)))
      //   || ((isTara && monstersFoundInTaraVersion.contains(recipe.mate))
      //     || (!isTara && monstersFoundInCobiVersion.contains(recipe.mate))))
      if ((isTara && (isFamilyOrFoundInTaraBase || isFamilyOrFoundInTaraMate))
      || (!isTara && (isFamilyOrFoundInCobiBase || isFamilyOrFoundInCobiMate)))
      {
        betterRecipe.add(recipe);
        continue;
      }

      // otherwise fall back to one where neither is found in worlds
      fallbackRecipe.add(recipe);
    }

    for (var recipe in bestRecipe) {
      print('looking at best recipe: ${recipe.toEquation()}');
      var node = _getRecipeTreeForMonsterHelper(root, level, recipe, isTara);
      if (node != null) {
        return node;
      }
    }

    for (var recipe in betterRecipe) {
      print('looking at better recipe: ${recipe.toEquation()}');
      var node = _getRecipeTreeForMonsterHelper(root, level, recipe, isTara);
      if (node != null) {
        return node;
      }
    }

    for (var recipe in fallbackRecipe) {
      print('looking at fallback recipe: ${recipe.toEquation()}');
      var node = _getRecipeTreeForMonsterHelper(root, level, recipe, isTara);
      if (node != null) {
        return node;
      }
    }
    

    throw new Exception('Could not successfully build any recipe tree for: $root, $level, $name, $isTara');
    // var recipeToUse = monster.recipes[0];
    // var base = getRecipeTreeForMonster(root, level+1, recipeToUse.base, isTara);
    // var mate = getRecipeTreeForMonster(root, level+1, recipeToUse.mate, isTara);
    // var newNode = new RecipeTreeNode(name, base, mate);

    // // update data
    // if (isTara) {
    //   taraRecipeTrees.putIfAbsent(name, () => newNode);
    // }
    // else {
    //   cobiRecipeTrees.putIfAbsent(name, () => newNode);
    // }

    // return newNode;
  }

  RecipeTreeNode? _getRecipeTreeForMonsterHelper(String root, int level, Recipe recipe, bool isTara) {
    try {
      print('Helper for: ${recipe.toEquation()}, $root, $level, $isTara');
      var base = getRecipeTreeForMonster(root, level+1, recipe.base, isTara);
      var mate = getRecipeTreeForMonster(root, level+1, recipe.mate, isTara);
      var newNode = new RecipeTreeNode(recipe.result, base, mate);

      // update data
      if (isTara) {
        taraRecipeTrees.putIfAbsent(recipe.result, () => newNode);
      }
      else {
        cobiRecipeTrees.putIfAbsent(recipe.result, () => newNode);
      }

      return newNode;
    } catch (ex) {
      print(ex);
    }

    return null;
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