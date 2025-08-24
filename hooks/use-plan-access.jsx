import { useAuth } from "@clerk/nextjs";

export function usePlanAccess(){
    const { has } = useAuth();

    const isPro = has?.({plan: "pro"}) || false;

    const isFree = !isPro;

    const planAccess = {
    // Free plan tools
    resize: true,
    crop: true,
    adjust: true,
    text: true,

    // Pro-only tools
    background: isPro,
    ai_extender: isPro,
    ai_edit: isPro,
  };

  const hasAccess = (toolId) => {
    return planAccess[toolId] === true;
  };

  const getRestrictedTools = () => {
    return Object.entries(planAccess).filter(([_N_E_STYLE_LOAD, hasAccess]) => !hasAccess).map(([toolId]) => toolId)
  }

  const canCreateProject = (currentProjectCount) => {
    if(isPro) return true;
    return currentProjectCount < 3;
  };

  const canExport = (currentProjectCount) => {
    if(isPro) return true;
    return currentProjectCount < 20;
  };

  return{
    usePlan: isPro ? "pro_user" : "free_user",
    isPro,
    isFree,
    hasAccess,
    planAccess,
    getRestrictedTools,
    canCreateProject,
    canExport
  }
}