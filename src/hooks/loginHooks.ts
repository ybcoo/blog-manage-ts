import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import { useUserStore } from "@/stores/UserStore.js";
import { login,register } from "../api/api.js";
export const loginHooks = () => {
  const router = useRouter();
  const mode = ref("login");
  const userStore=useUserStore()
  const loginForm = reactive({
    account: "",
    password: "",
  });
  const registerForm = reactive({
    account: "",
    password: "",
    confirmPassword: "",
  });
  const getRipple = (e: any) => {
    const button = e.currentTarget;

    // 创建扩散元素
    const ripple = document.createElement("span");

    // 计算按钮尺寸和点击位置
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    // 设置扩散元素样式
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");

    // 清除已有的扩散元素，添加新的
    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }
    button.appendChild(ripple);
  };
  const handleLogin = async (e: any) => {
    getRipple(e);
    if (!loginForm.account || !loginForm.password) {
      Message.error("请输入账号和密码");
      return;
    }
    try {
      const res= await login(loginForm);
      const {success,code,data}=res?.data
      if (success&&code===0) {
        const {currentToken,role}=data??{}
        currentToken&&localStorage.setItem('token',currentToken)
        role&&(userStore.role=role)
        router.push("/mainBox");
      }else{
        const {message}=data
        Message.error(message)
      }
    } catch (e) {
      console.error(e);
      Message.error("账号密码错误");
    }
  };
  const handleRegister = async (e: any) => {
    getRipple(e);
    if(!registerForm.account || !registerForm.password){
        Message.error("请输入账号和密码");
        return;
    }else if(!registerForm.confirmPassword){
        Message.error('请确认密码')
        return
    }
    try{
        const res=await register(registerForm)
        const {success,code,data}=res?.data
        if(success&&code===0){
            mode.value='login'
        }else{
            const {message}=data
            Message.error(message)
        }
    }catch(e){
        console.error(e)
    }
  };
  return { mode, loginForm, registerForm, handleLogin, handleRegister };
};
