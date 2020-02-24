declare var Ext: any
export class ExtClassComponent {
  public classname: any
  public extend: any
  public defineConfig: any
  public createConfig: any
  public ext: any
  constructor (classname: any, extend: string, defineConfig: any, createConfig: any) {
    console.log(classname)
    if (!Ext.ClassManager.isCreated(classname)) {
      console.log('in define')
      Ext.apply(defineConfig, { extend: extend })
      Ext.define(classname, defineConfig)
      console.log(defineConfig)

    }
    this.classname = classname
    this.extend = extend
    this.defineConfig = defineConfig
    this.createConfig = createConfig
    this.ext = Ext.create(classname, createConfig)
    console.log(createConfig)
    console.log(this.ext)
  }
}