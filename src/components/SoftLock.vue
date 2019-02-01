<template>
  <div id="container">
    <div id="game"></div>
    <div id="score">0</div>
    <div id="instructions">Click (or press the spacebar) to place the block</div>
    <div class="game-over">
      <h2>游戏结束</h2>
      <p>你已经做的很好，你真棒！</p>
      <p>点击空白区域再次游戏</p>
    </div>
    <div class="game-ready">
      <div id="start-button">开始</div>
      <div></div>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as THREE from 'three'
import { TweenLite, TweenMax, Power1, TimelineLite } from 'gsap'

interface BlockReturn {
  placed?: any
  chopped?: any
  plane: 'x' | 'y' | 'z'
  direction: number
  bonus?: boolean
}

class Stage {
  private container: any
  private camera: any
  private scene: any
  private renderer: any
  private light: any
  private softLight: any
  private group: any

  constructor(init: boolean = true) {
    if (init) {
      // container

      this.container = document.getElementById('game')

      // renderer

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
      })

      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor('#D0CBC7', 1)
      this.container.appendChild(this.renderer.domElement)

      // scene

      this.scene = new THREE.Scene()

      // camera

      const aspect = window.innerWidth / window.innerHeight
      const d = 20
      this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, -100, 1000)
      this.camera.position.x = 2
      this.camera.position.y = 2
      this.camera.position.z = 2
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))

      // light

      this.light = new THREE.DirectionalLight(0xffffff, 0.5)
      this.light.position.set(0, 499, 0)
      this.scene.add(this.light)

      this.softLight = new THREE.AmbientLight(0xffffff, 0.4)
      this.scene.add(this.softLight)

      window.addEventListener('resize', () => this.onResize())
      this.onResize()
    }
  }

  public setCamera: (y: number, speed: number) => void = (y: number, speed: number = 0.3) => {
    TweenLite.to(this.camera.position, speed, { y: y + 4, ease: Power1.easeInOut })
    TweenLite.to(this.camera.lookAt, speed, { y, ease: Power1.easeInOut })
  }

  public onResize: () => void = () => {
    const viewSize = 30
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.left = window.innerWidth / -viewSize
    this.camera.right = window.innerWidth / viewSize
    this.camera.top = window.innerHeight / viewSize
    this.camera.bottom = window.innerHeight / -viewSize
    this.camera.updateProjectionMatrix()
  }

  public render = () => {
    this.renderer.render(this.scene, this.camera)
  }

  public add: (ele: any) => void = (ele: any) => {
    this.scene.add(ele)
  }

  public remove: (ele: any) => void = (ele: any) => {
    this.scene.remove(ele)
  }
}

interface Point {
  [x: string]: number
}

// tslint:disable-next-line:max-classes-per-file
class Block {
  public STATES = { ACTIVE: 'active', STOPPED: 'stopped', MISSED: 'missed' }
  public MOVE_AMOUNT = 12

  public dimension: Point = { width: 0, height: 0, depth: 0 }
  public position: Point = { x: 0, y: 0, z: 0 }

  public mesh: any
  public state: string
  public index: number
  public speed: number
  public direction: number
  public color: THREE.Color
  public colorOffset: number
  public material: any

  public workingPlane: 'x' | 'y' | 'z'
  public workingDimension: string

  public targetBlock: Block

  constructor(block: Block) {
    // set size and position

    this.targetBlock = block

    this.index = (this.targetBlock ? this.targetBlock.index : 0) + 1
    this.workingPlane = this.index % 2 ? 'x' : 'z'
    this.workingDimension = this.index % 2 ? 'width' : 'depth'

    // set the dimensions from the target block, or defaults.

    this.dimension.width = this.targetBlock ? this.targetBlock.dimension.width : 10
    this.dimension.height = this.targetBlock ? this.targetBlock.dimension.height : 2
    this.dimension.depth = this.targetBlock ? this.targetBlock.dimension.depth : 10

    this.position.x = this.targetBlock ? this.targetBlock.position.x : 0
    this.position.y = this.dimension.height * this.index
    this.position.z = this.targetBlock ? this.targetBlock.position.z : 0

    this.colorOffset = this.targetBlock ? this.targetBlock.colorOffset : Math.round(Math.random() * 100)

    // set color
    if (!this.targetBlock) {
      this.color = new THREE.Color(0x333344)
    } else {
      const offset = this.index + this.colorOffset
      const r = Math.sin(0.3 * offset) * 55 + 200
      const g = Math.sin(0.3 * offset + 2) * 55 + 200
      const b = Math.sin(0.3 * offset + 4) * 55 + 200
      this.color = new THREE.Color(r / 255, g / 255, b / 255)
    }

    // state

    this.state = this.index > 1 ? this.STATES.ACTIVE : this.STATES.STOPPED

    // set direction

    this.speed = -0.1 - this.index * 0.005
    if (this.speed < -4) {
      this.speed = -4
    }
    this.direction = this.speed

    // create block

    const geometry = new THREE.BoxGeometry(this.dimension.width, this.dimension.height, this.dimension.depth)
    geometry.applyMatrix(
      new THREE.Matrix4().makeTranslation(this.dimension.width / 2, this.dimension.height / 2, this.dimension.depth / 2)
    )
    this.material = new THREE.MeshStandardMaterial({ color: this.color })
    this.mesh = new THREE.Mesh(geometry, this.material)
    this.mesh.position.set(
      this.position.x,
      this.position.y + (this.state === this.STATES.ACTIVE ? 0 : 0),
      this.position.z
    )

    if (this.state === this.STATES.ACTIVE) {
      this.position[this.workingPlane] = Math.random() > 0.5 ? -this.MOVE_AMOUNT : this.MOVE_AMOUNT
    }
  }

  public reverseDirection() {
    this.direction = this.direction > 0 ? this.speed : Math.abs(this.speed)
  }

  public place: () => BlockReturn = () => {
    this.state = this.STATES.STOPPED

    let overlap =
      this.targetBlock.dimension[this.workingDimension] -
      Math.abs(this.position[this.workingPlane] - this.targetBlock.position[this.workingPlane])

    const blocksToReturn: BlockReturn = {
      plane: this.workingPlane,
      direction: this.direction
    }

    if (this.dimension[this.workingDimension] - overlap < 0.3) {
      overlap = this.dimension[this.workingDimension]
      blocksToReturn.bonus = true
      this.position.x = this.targetBlock.position.x
      this.position.z = this.targetBlock.position.z
      this.dimension.width = this.targetBlock.dimension.width
      this.dimension.depth = this.targetBlock.dimension.depth
    }

    if (overlap > 0) {
      const choppedDimensions: Point = {
        width: this.dimension.width,
        height: this.dimension.height,
        depth: this.dimension.depth
      }
      choppedDimensions[this.workingDimension] -= overlap
      this.dimension[this.workingDimension] = overlap

      const placedGeometry = new THREE.BoxGeometry(this.dimension.width, this.dimension.height, this.dimension.depth)
      placedGeometry.applyMatrix(
        new THREE.Matrix4().makeTranslation(
          this.dimension.width / 2,
          this.dimension.height / 2,
          this.dimension.depth / 2
        )
      )
      const placedMesh = new THREE.Mesh(placedGeometry, this.material)

      const choppedGeometry = new THREE.BoxGeometry(
        choppedDimensions.width,
        choppedDimensions.height,
        choppedDimensions.depth
      )
      choppedGeometry.applyMatrix(
        new THREE.Matrix4().makeTranslation(
          choppedDimensions.width / 2,
          choppedDimensions.height / 2,
          choppedDimensions.depth / 2
        )
      )
      const choppedMesh = new THREE.Mesh(choppedGeometry, this.material)

      const choppedPosition: Point = {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z
      }

      if (this.position[this.workingPlane] < this.targetBlock.position[this.workingPlane]) {
        this.position[this.workingPlane] = this.targetBlock.position[this.workingPlane]
      } else {
        choppedPosition[this.workingPlane] += overlap
      }

      placedMesh.position.set(this.position.x, this.position.y, this.position.z)
      choppedMesh.position.set(choppedPosition.x, choppedPosition.y, choppedPosition.z)

      blocksToReturn.placed = placedMesh
      if (!blocksToReturn.bonus) {
        blocksToReturn.chopped = choppedMesh
      }
    } else {
      this.state = this.STATES.MISSED
    }

    this.dimension[this.workingDimension] = overlap

    return blocksToReturn
  }

  public tick() {
    if (this.state === this.STATES.ACTIVE) {
      const value = this.position[this.workingPlane]
      if (value > this.MOVE_AMOUNT || value < -this.MOVE_AMOUNT) {
        this.reverseDirection()
      }
      this.position[this.workingPlane] += this.direction
      this.mesh.position[this.workingPlane] = this.position[this.workingPlane]
    }
  }
}

interface IState {
  [str: string]: string
}
// tslint:disable-next-line:max-classes-per-file
class Game {
  public STATES: IState = {
    LOADING: 'loading',
    PLAYING: 'playing',
    READY: 'ready',
    ENDED: 'ended',
    RESETTING: 'resetting'
  }
  public blocks: Block[] = []
  public state: string = this.STATES.LOADING

  // groups

  public newBlocks: any
  public placedBlocks: any
  public choppedBlocks: any

  // UI elements

  public scoreContainer: any
  public mainContainer: any
  public startButton: any
  public instructions: any

  public stage: Stage

  constructor(init: boolean = true) {
    if (init) {
      this.stage = new Stage(init)

      this.mainContainer = document.getElementById('container')
      this.scoreContainer = document.getElementById('score')
      this.startButton = document.getElementById('start-button')
      this.instructions = document.getElementById('instructions')
      this.scoreContainer.innerHTML = '0'

      this.newBlocks = new THREE.Group()
      this.placedBlocks = new THREE.Group()
      this.choppedBlocks = new THREE.Group()

      this.stage.add(this.newBlocks)
      this.stage.add(this.placedBlocks)
      this.stage.add(this.choppedBlocks)

      this.addBlock()
      this.tick()

      this.updateState(this.STATES.READY)

      document.addEventListener('keydown', e => {
        if (e.keyCode === 32) {
          this.onAction()
        }
      })

      document.addEventListener('click', e => {
        this.onAction()
      })

      document.addEventListener('touchstart', e => {
        e.preventDefault()
        // this.onAction();

        // ☝️ this triggers after click on android so you
        // insta-lose, will figure it out later.
      })
    } else {
      this.stage = new Stage(init)
    }
  }

  public updateState(newState: string) {
    // tslint:disable-next-line:forin
    for (const key in this.STATES) {
      this.mainContainer.classList.remove(this.STATES[key])
    }
    this.mainContainer.classList.add(newState)
    this.state = newState
  }

  public onAction() {
    switch (this.state) {
      case this.STATES.READY:
        this.startGame()
        break
      case this.STATES.PLAYING:
        this.placeBlock()
        break
      case this.STATES.ENDED:
        this.restartGame()
        break
    }
  }

  public startGame() {
    if (this.state !== this.STATES.PLAYING) {
      this.scoreContainer.innerHTML = '0'
      this.updateState(this.STATES.PLAYING)
      this.addBlock()
    }
  }

  public restartGame() {
    this.updateState(this.STATES.RESETTING)

    const oldBlocks = this.placedBlocks.children
    const removeSpeed = 0.2
    const delayAmount = 0.02
    for (let i = 0; i < oldBlocks.length; i++) {
      TweenLite.to(oldBlocks[i].scale, removeSpeed, {
        x: 0,
        y: 0,
        z: 0,
        delay: (oldBlocks.length - i) * delayAmount,
        ease: Power1.easeIn,
        onComplete: () => this.placedBlocks.remove(oldBlocks[i])
      })
      TweenLite.to(oldBlocks[i].rotation, removeSpeed, {
        y: 0.5,
        delay: (oldBlocks.length - i) * delayAmount,
        ease: Power1.easeIn
      })
    }
    const cameraMoveSpeed = removeSpeed * 2 + oldBlocks.length * delayAmount
    this.stage.setCamera(2, cameraMoveSpeed)

    const countdown = { value: this.blocks.length - 1 }
    TweenLite.to(countdown, cameraMoveSpeed, {
      value: 0,
      onUpdate: () => {
        this.scoreContainer.innerHTML = String(Math.round(countdown.value))
      }
    })

    this.blocks = this.blocks.slice(0, 1)

    setTimeout(() => {
      this.startGame()
    }, cameraMoveSpeed * 1000)
  }

  public placeBlock() {
    const currentBlock = this.blocks[this.blocks.length - 1]
    const newBlocks: BlockReturn = currentBlock.place()
    this.newBlocks.remove(currentBlock.mesh)
    if (newBlocks.placed) {
      this.placedBlocks.add(newBlocks.placed)
    }
    if (newBlocks.chopped) {
      this.choppedBlocks.add(newBlocks.chopped)
      const positionParams = {
        x: '',
        y: '-=30',
        z: '',
        ease: Power1.easeIn,
        onComplete: () => this.choppedBlocks.remove(newBlocks.chopped)
      }
      const rotateRandomness = 10
      const rotationParams = {
        delay: 0.05,
        x: newBlocks.plane === 'z' ? Math.random() * rotateRandomness - rotateRandomness / 2 : 0.1,
        z: newBlocks.plane === 'x' ? Math.random() * rotateRandomness - rotateRandomness / 2 : 0.1,
        y: Math.random() * 0.1
      }
      if (newBlocks.chopped.position[newBlocks.plane] > newBlocks.placed.position[newBlocks.plane]) {
        positionParams[newBlocks.plane] = '+=' + 40 * Math.abs(newBlocks.direction)
      } else {
        positionParams[newBlocks.plane] = '-=' + 40 * Math.abs(newBlocks.direction)
      }
      TweenLite.to(newBlocks.chopped.position, 1, positionParams)
      TweenLite.to(newBlocks.chopped.rotation, 1, rotationParams)
    }

    this.addBlock()
  }

  public addBlock() {
    const lastBlock = this.blocks[this.blocks.length - 1]

    if (lastBlock && lastBlock.state === lastBlock.STATES.MISSED) {
      return this.endGame()
    }

    this.scoreContainer.innerHTML = String(this.blocks.length - 1)

    const newKidOnTheBlock = new Block(lastBlock)
    this.newBlocks.add(newKidOnTheBlock.mesh)
    this.blocks.push(newKidOnTheBlock)

    this.stage.setCamera(this.blocks.length * 2, 0)

    if (this.blocks.length >= 5) {
      this.instructions.classList.add('hide')
    }
  }

  public endGame() {
    this.updateState(this.STATES.ENDED)
  }

  public tick() {
    this.blocks[this.blocks.length - 1].tick()
    this.stage.render()
    requestAnimationFrame(() => {
      this.tick()
    })
  }
}

// tslint:disable-next-line:max-classes-per-file
@Component({
  name: 'tableOfElement'
})
export default class SoftLock extends Vue {
  public game: Game
  constructor() {
    super()
    this.game = new Game(false)
  }

  public mounted() {
    this.game = new Game()
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Comfortaa');

$color-dark: #333344;

#container {
  width: 100%;
  height: 100%;

  #score {
    position: absolute;
    top: 45px;
    width: 100%;
    text-align: center;
    font-size: 10vh;
    transition: transform 0.5s ease;
    color: $color-dark;
    transform: translatey(-200px) scale(1);
  }

  #game {
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .game-over {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    * {
      transition: opacity 0.5s ease, transform 0.5s ease;
      opacity: 0;
      transform: translatey(-50px);
      color: $color-dark;
    }

    h2 {
      margin: 0;
      padding: 0;
      font-size: 40px;
    }
  }

  .game-ready {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    #start-button {
      transition: opacity 0.5s ease, transform 0.5s ease;
      opacity: 0;
      transform: translatey(-50px);

      border: 3px solid $color-dark;
      padding: 10px 20px;
      background-color: transparent;
      color: $color-dark;
      font-size: 30px;
    }
  }

  #instructions {
    position: absolute;
    width: 100%;
    top: 16vh;
    left: 0;
    text-align: center;
    transition: opacity 0.5s ease, transform 0.5s ease;

    opacity: 0;

    &.hide {
      opacity: 0 !important;
    }
  }

  &.playing,
  &.resetting {
    #score {
      transform: translatey(0px) scale(1);
    }
  }

  &.playing {
    #instructions {
      opacity: 1;
    }
  }

  &.ready {
    .game-ready {
      #start-button {
        opacity: 1;
        transform: translatey(0);
      }
    }
  }

  &.ended {
    #score {
      transform: translatey(6vh) scale(1.5);
    }

    .game-over {
      * {
        opacity: 1;
        transform: translatey(0);
      }

      p {
        transition-delay: 0.3s;
      }
    }
  }
}
</style>
