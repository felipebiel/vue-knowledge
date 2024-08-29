export interface RulesInterface {
    type: 'email' | 'text';
    name: string;
    required: boolean;
    customMessageRequired?: string;
    customMessageMinLength?: string;
    customMessageMaxLength?: string;
    minLength?: number;
    maxLength?: number;
}

export const validateInput = (rule: RulesInterface | undefined | null, value: string | number) => {
    if (!rule) return '';
    switch (rule.type) {
        // case 'email':
        //     return emailValidate(rule, value);
        case 'text':
            return textValidate(rule, value);
    }

    return '';
};

export const textValidate = (rule: RulesInterface, value: string | number): string => {
    const valueToString = new String(value);
    if (rule.required && valueToString == '') {
        return rule.customMessageRequired ? rule.customMessageRequired : `O campo ${rule.name} é obrigatório.`;
    }
    if (
        (valueToString == null || valueToString.trim().split('').length > 0) &&
        rule.minLength &&
        rule.minLength > valueToString.split('').length
    ) {
        return rule.customMessageMinLength ? rule.customMessageMinLength : `Por favor, forneça ao menos ${rule.minLength} caracteres.`;
    }
    if (
        (valueToString == null || valueToString.trim().split('').length > 0) &&
        rule.maxLength &&
        rule.maxLength < valueToString.split('').length
    ) {
        return rule.customMessageMaxLength ? rule.customMessageMaxLength : `Por favor, forneça até ${rule.maxLength} caracteres.`;
    }

    return '';
};
