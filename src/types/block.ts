export interface BaseBlock{
    /**id 区分组件 */
    id:string,
    /**组件名 */
    code:string,
    /**物料区标题 */
    name:string,
    /**物料区图标 */
    icon:string,
    /**是否嵌套组件 */
    nested?:boolean,
    /**嵌套子项 */
    children?:BaseBlock[][],
    /**配置内容 */
    formData?:any
}
export const BaseBlock:BaseBlock[]=[
    {
        id:'',
        name:'图片',
        code:'mo-image',
        icon:'',
        formData:{}
    }
]