import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { Vector3 } from 'three'

/** Create a line in 3D space. Useful for connecting points of interest to specific places on a 3D model */
export class Line {
  constructor(startPosition, endPosition, color = 0xffffff) {
    // create a geometry for the line
    this.lineGeometry = new LineGeometry()

    // save the position to update later
    this.startPosition = startPosition
    this.endPosition = endPosition

    //add the start and end position
    this.lineGeometry.setPositions([startPosition.x, startPosition.y, startPosition.z, endPosition.x, endPosition.y, endPosition.z])

    // create a material with the given color
    this.lineMaterial = new LineMaterial({
      color: color,
      linewidth: 0.01,
      vertexColors: false,
      dashed: false,
      dashOffset: 0,
      dashScale: 1,
      dashSize: 1,
      alphaToCoverage: true,
    })

    this.mesh = new Line2(this.lineGeometry, this.lineMaterial)
    this.mesh.computeLineDistances()
  }

  updateStartPosition(x, y, z) {
    this.startPosition = new Vector3(x, y, z)
  }

  updateEndPosition(x, y, z) {
    this.endPosition = new Vector3(x, y, z)
  }

  updateGeometry(positionsArray) {
    if (positionsArray) {
      this.lineGeometry.setPositions(positionsArray)
    } else {
      this.lineGeometry.setPositions(this.startPosition.concat(this.endPosition))
    }
  }
}
