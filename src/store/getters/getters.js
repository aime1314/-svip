export default{//根据state值重新组装后重新赋值到页面，共其他用
    updateMemberShow(state){
        return `${state.memberinfo.svipLevel} ${state.memberinfo.svipStatus}`
    }
}