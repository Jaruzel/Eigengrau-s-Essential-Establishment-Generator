/* global setup */
setup.createTemple = function (town, opts) {
  console.log('Creating a temple...')
  opts = opts || {}
  let temple = (opts['newBuilding'] || setup.createBuilding)(town, 'temple')
  var data = setup.temple

  Object.assign(temple, {
    passageName: 'TempleOutput',
    initPassage: 'TempleOutput',
    BuildingType: 'temple',
    wordNoun: data.name.wordNoun.seededrandom(),
    priest: setup.createNPC(town, {
      dndClass: ['cleric', 'cleric', 'cleric', 'cleric', 'druid'].seededrandom(),
      background: ['acolyte', 'acolyte', 'acolyte', 'acolyte', 'sage', 'sage', 'sage'].seededrandom(),
      profession: 'priest'
    }),
    prayerSubject: data.prayerSubject.seededrandom(),
    dedicated: [setup.misc.religion.namedGod.seededrandom(), setup.misc.religion.abstractGod.seededrandom(), setup.misc.religion.saint.seededrandom(),  data.dedicated.seededrandom()].seededrandom(),
    knownFor: data.knownFor.seededrandom(),
    guardedBy: data.guardedBy.seededrandom(),
    floorPlan: data.floorPlan.seededrandom(),
    complex: data.complex.seededrandom(),
    walls: data.walls.seededrandom(),
    ceiling: data.ceiling.seededrandom(),
    rooms: data.rooms.seededrandom(),
    features: data.features.seededrandom(),
    architect: data.architect.seededrandom()
    
  })
 
  temple.name = [
    'The ' + data.name.adjective.seededrandom().toUpperFirst() + ' ' + data.name.plural.seededrandom().toUpperFirst(),
    'The ' + temple.wordNoun.toUpperFirst() + ' of ' + data.name.soleNoun.seededrandom().toUpperFirst(),
    'The ' + temple.wordNoun.toUpperFirst() + ' of ' + data.name.adjective.seededrandom().toUpperFirst() + ' ' + data.name.plural.seededrandom().toUpperFirst(),
    setup.createName({race: temple.priest.race}) + "'s " + temple.wordNoun.toUpperFirst(),
    setup.createName({race: temple.priest.race}) + "'s " + data.name.soleNoun.seededrandom().toUpperFirst()
  ].seededrandom()

  

  temple.wealth = ''
  temple.size = ''
  temple.cleanliness = ''

  var rollDataVariables = ['wealth', 'size', 'cleanliness']
  rollDataVariables.forEach(function (propName) {
    setup.defineRollDataGetter(temple, data.rollData, propName)
  })

  //These are the full sentence printouts referenced within TempleOutput.twee
  temple.guardReadout = 'This ' + temple.wordNoun + ' is protected by ' + temple.guardedBy + '.'
  temple.aboutReadout = 'Within this holy place they pray to ' + temple.prayerSubject + '. The temple itself was originally dedicated to ' + temple.dedicated + ' and is known for ' + temple.knownFor + '. The ' + temple.wordNoun + ' was designed by ' + temple.architect + ' and it is ' + temple.complex + '.'
  temple.interiorReadout = 'You enter the ' + temple.size + ', ' + temple.cleanliness + ' ' + temple.wordNoun + ' and notice ' +  temple.features + '. The main room is ' + temple.floorPlan + ' in shape and is decorated with ' + temple.wealth + ' looking furniture. The walls of the ' + temple.wordNoun + ' are ' + temple.walls + ' and the the ceiling is ' + temple.ceiling + '.'
  temple.tippyDescription = 'A ' + temple.size + ' and ' + temple.cleanliness + ' ' + temple.wordNoun + ' that is dedicated to ' + temple.dedicated
  return temple
}
