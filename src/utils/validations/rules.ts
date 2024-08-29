export interface RulesInterface {
    type: 'email' | 'text';
    name: string;
    required: boolean;
    customMessageRequired?: string;
    customMessageMinLength?: string;
    customMessageMaxLength?: string;
    customMessageEmail?: string;
    minLength?: number;
    maxLength?: number;
}

export const validateInput = (rule: RulesInterface | undefined | null, value: string | number) => {
    if (!rule) return '';
    switch (rule.type) {
        case 'email':
            return emailValidate(rule, value);
        case 'text':
            return textValidate(rule, value);
    }

    return '';
};

export const textValidate = (rule: RulesInterface, value: string | number): string => {
    const valueToString = new String(value);
    const VALUE_LENGTH = valueToString.trim().split('').length;
    if (rule.required && VALUE_LENGTH == 0) {
        return rule.customMessageRequired ? rule.customMessageRequired : `O campo ${rule.name} é obrigatório.`;
    }
    if (VALUE_LENGTH > 0 && rule.minLength && rule.minLength > VALUE_LENGTH) {
        return rule.customMessageMinLength ? rule.customMessageMinLength : `Por favor, forneça ao menos ${rule.minLength} caracteres.`;
    }
    if (VALUE_LENGTH > 0 && rule.maxLength && rule.maxLength < VALUE_LENGTH) {
        return rule.customMessageMaxLength ? rule.customMessageMaxLength : `Por favor, forneça até ${rule.maxLength} caracteres.`;
    }

    return '';
};

export const emailValidate = (rule: RulesInterface, value: string | number): string => {
    const valueToString = new String(value);
    const VALUE_LENGTH = valueToString.trim().split('').length;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (rule.required && VALUE_LENGTH == 0) {
        return rule.customMessageRequired ? rule.customMessageRequired : `O campo ${rule.name} é obrigatório.`;
    }
    if (VALUE_LENGTH > 0 && !emailRegex.test(valueToString as string)) {
        return rule.customMessageEmail ? rule.customMessageEmail : 'Insira um e-mail válido.';
    }

    return '';
};
