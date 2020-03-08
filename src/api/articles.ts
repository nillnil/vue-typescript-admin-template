import http from '@/utils/http'
import { IArticleData } from './types'

export const defaultArticleData: IArticleData = {
  id: 0,
  status: 'draft',
  title: '',
  fullContent: '',
  abstractContent: '',
  sourceURL: '',
  imageURL: '',
  timestamp: '',
  platforms: ['a-platform'],
  disableComment: false,
  importance: 0,
  author: '',
  reviewer: '',
  type: '',
  pageviews: 0
}

export const getArticles = (params: any) =>
  http({
    url: '/articles',
    method: 'get',
    params
  })

export const getArticle = (id: number, params: any) =>
  http({
    url: `/articles/${id}`,
    method: 'get',
    params
  })

export const createArticle = (data: any) =>
  http({
    url: '/articles',
    method: 'post',
    data
  })

export const updateArticle = (id: number, data: any) =>
  http({
    url: `/articles/${id}`,
    method: 'put',
    data
  })

export const deleteArticle = (id: number) =>
  http({
    url: `/articles/${id}`,
    method: 'delete'
  })

export const getPageviews = (params: any) =>
  http({
    url: '/pageviews',
    method: 'get',
    params
  })
