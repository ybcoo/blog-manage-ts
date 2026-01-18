import { Type,type Static  } from "@sinclair/typebox";
export const schema=Type.Object({
    src:Type.String({
        code:'config-files',
        title:'图片',
        default:''
    }),
    link:Type.String({
        code:'config-input',
        title:'链接',
        default:'',
        placeholder:'请输入链接'
    }),
    width:Type.String({
        code:'config-input',
        title:'宽度',
        default:'100%',
        placeholder:'请输入宽度'
    }),
    height:Type.String({
        code:'config-input',
        title:'高度',
        default:'100px',
        placeholder:'请输入高度'
    })
})
