/* global setup */
setup.createTavern = function (town, opts) {
  opts = opts || {}
  var tavern = (opts['newBuilding'] || setup.createBuilding)(town, 'tavern')

  tavern.name = setup.createTavernName()
  console.groupCollapsed(tavern.name)
  tavern.bartender = (opts['newBartender'] || setup.createBartender)(town.name, tavern.name)
  tavern.barmaid = setup.createNPC({
    isShallow: true,
    gender: 'woman',
    background: 'commoner',
    hasClass: false,
    profession: 'barmaid'
  })

  Object.assign(tavern, {
    passageName: 'TavernOutput',
    initPassage: 'InitTavern',
    wordnoun: ['tavern', 'tavern', 'tavern', 'tavern', 'pub', 'pub', 'pub', 'inn', 'inn', 'bar', 'bar', 'bar', 'watering hole', 'drinkery'].random(),
    shortages: ['wine', 'booze', 'grog', 'whiskey', 'mutton', 'lamb', 'carrots', 'mugs', 'forks', 'frogs', 'bread', 'mushrooms', 'salt', 'silver pieces', 'chairs', 'eggs', 'potatoes'],
    fun: setup.tavernData.fun.random(),
    type: [
      'quiet and low-key bar',
      'regular',
      'regular',
      'regular',
      'regular',
      'raucous dive',
      'raucous dive',
      'raucous dive',
      'raucous dive',
      "thieves' guild hangout",
      'gathering place for a secret society',
      'high-end dining club',
      'high-end dining club',
      'gambling den',
      'gambling den',
      tavern.bartender.race + ' only club',
      "guild-member's only club",
      "guild-member's only club",
      'members-only club',
      'brothel',
      'brothel'
    ].random(),
    // entertainment: setup.tavernData.entertainment.random(),
    // patrons: setup.tavernData.patrons.random(),
    game: setup.tavernData.games.random()
    // get size () {
    //   this.size = setup.tavernData.descriptors['size'].find(function (descriptor) {
    //     return descriptor[0] <= this.sizeRoll
    //   })[1] || this._size
    // },
    // set size (value) {
    //   this._size = value
    //   if (setup.tavernData.descriptors['size'].includes(value)) {
    //     this.sizeRoll = setup.tavernData.descriptors['size'].find(function (descriptor) {
    //       return descriptor[0] === value
    //     })[0]
    //   }
    // }
  })

  Object.assign(tavern, setup.getTavernDraws(town, tavern))
  // console.log(tavern)

  if (tavern.draw === 'proximity to the church') {
    if (tavern.type.indexOf(['gambling den', 'proximity to the brothel', 'raucous dive']) !== -1) {
      tavern.draw = 'proximity to the brothel'
    } else if (tavern.type === 'brothel') {
      tavern.draw = 'cheap prices for customers'
      tavern.hasBrothel = true
    }
  }
  setup.tavernModifiers(town, tavern)
  setup.tavernRender(tavern)
  console.log(tavern)
  console.groupEnd();
  return tavern
}
