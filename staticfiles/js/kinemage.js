
export function showKinemage (kinName, stage) {
  NGL.autoLoad(kinName).then(function (kinemage) {
    console.warn(kinemage['1viewid'])
    for (let master in kinemage.masterDict) {
      var shape = new NGL.Shape(master)
      kinemage.dotLists.forEach(function (dotList) {
        if (!dotList.masterArray.includes(master)) return
        for (var i = 0, il = dotList.positionArray.length / 3; i < il; ++i) {
          var i3 = i * 3
          var x = dotList.positionArray[ i3 ]
          var y = dotList.positionArray[ i3 + 1 ]
          var z = dotList.positionArray[ i3 + 2 ]
          var r = dotList.colorArray[ i3 ]
          var g = dotList.colorArray[ i3 + 1 ]
          var b = dotList.colorArray[ i3 + 2 ]
          shape.addPoint([ x, y, z ], [ r, g, b ], dotList.labelArray[ i ])
        }
      })
      kinemage.vectorLists.forEach(function (vectorList) {
        if (!vectorList.masterArray.includes(master)) return
        for (var i = 0, il = vectorList.position1Array.length / 3; i < il; ++i) {
          var i3 = i * 3
          var x1 = vectorList.position1Array[ i3 ]
          var y1 = vectorList.position1Array[ i3 + 1 ]
          var z1 = vectorList.position1Array[ i3 + 2 ]
          var x2 = vectorList.position2Array[ i3 ]
          var y2 = vectorList.position2Array[ i3 + 1 ]
          var z2 = vectorList.position2Array[ i3 + 2 ]
          var r = vectorList.color1Array[ i3 ]
          var g = vectorList.color1Array[ i3 + 1 ]
          var b = vectorList.color1Array[ i3 + 2 ]
          var width = 2
          if (vectorList.width.length != 0) {
            width = vectorList.width[0]
          }
          shape.addWideline([ x1, y1, z1 ], [ x2, y2, z2 ], [ r, g, b ], width, vectorList.label1Array[ i ])
        }
      })

      kinemage.ballLists.forEach(function (ballList) {
        if (!ballList.masterArray.includes(master)) return
        for (var i = 0, il = ballList.positionArray.length / 3; i < il; ++i) {
          var i3 = i * 3
          var x = ballList.positionArray[ i3 ]
          var y = ballList.positionArray[ i3 + 1 ]
          var z = ballList.positionArray[ i3 + 2 ]
          var r = ballList.colorArray[ i3 ]
          var g = ballList.colorArray[ i3 + 1 ]
          var b = ballList.colorArray[ i3 + 2 ]
          shape.addSphere([ x, y, z ], [ r, g, b ], ballList.radiusArray[ i ], ballList.labelArray[ i ])
        }
      })

      var positionArray = []
      var colorArray = []
      var masterRibbonPositionArray = []
      var masterRibbonColorArray = []
      var masterRibbonLabelArray = []
      kinemage.ribbonLists.forEach(function (ribbonList) {
        if (!ribbonList.masterArray.includes(master)) return
        for (var i = 0, il = ribbonList.positionArray.length / 9; i < il; ++i) {
          var i9 = i * 9
          var i3 = i * 3
          var x1 = ribbonList.positionArray[ i9 ]
          var y1 = ribbonList.positionArray[ i9 + 1 ]
          var z1 = ribbonList.positionArray[ i9 + 2 ]
          var x2 = ribbonList.positionArray[ i9 + 3 ]
          var y2 = ribbonList.positionArray[ i9 + 4 ]
          var z2 = ribbonList.positionArray[ i9 + 5 ]
          var x3 = ribbonList.positionArray[ i9 + 6 ]
          var y3 = ribbonList.positionArray[ i9 + 7 ]
          var z3 = ribbonList.positionArray[ i9 + 8 ]
          var r1 = ribbonList.colorArray[ i9 ]
          var g1 = ribbonList.colorArray[ i9 + 1 ]
          var b1 = ribbonList.colorArray[ i9 + 2 ]
          var r2 = ribbonList.colorArray[ i9 + 3 ]
          var g2 = ribbonList.colorArray[ i9 + 4 ]
          var b2 = ribbonList.colorArray[ i9 + 5 ]
          var r3 = ribbonList.colorArray[ i9 + 6 ]
          var g3 = ribbonList.colorArray[ i9 + 7 ]
          var b3 = ribbonList.colorArray[ i9 + 8 ]
        }
        masterRibbonPositionArray.push(...ribbonList.positionArray)
        masterRibbonColorArray.push(...ribbonList.colorArray)
        masterRibbonLabelArray.push(...ribbonList.labelArray)
      })
      if (masterRibbonPositionArray.length > 0) {
        shape.addMesh(masterRibbonPositionArray, masterRibbonColorArray, undefined, [ ], [ ])
      }

      var visible = kinemage.masterDict[ master ].visible
      if (master.startsWith('chain') || master.startsWith('dots')) {
        visible = false
      }
      var shapeComp = stage.addComponentFromObject(shape, { visible: visible })
      shapeComp.addRepresentation('buffer')
    }
  // console.warn(stage.parameters)
    stage.setParameters({cameraType: 'orthographic'})
    stage.autoView()
  })
}
