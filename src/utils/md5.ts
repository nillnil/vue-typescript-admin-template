import md5 from 'js-md5'

export const encrypt = (str: string) => md5(str)
