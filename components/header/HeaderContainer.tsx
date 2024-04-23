'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { menuList } from '@/constants/products'
import { Category, GetInitDataReturnType } from '@/types/category'
import Header from '@/components/header/Header'
import ButtonBack from '@/components/header/ButtonBack'
import ButtonCategoryTitle from '@/components/header/ButtonCategoryTitle'
import ButtonCart from '@/components/header/ButtonCart'
import Snb from '@/components/header/Snb'

const getCategoryData = (list: Category[], targetId: string): GetInitDataReturnType => {
  for (const topCategory of list) {
    if (targetId === topCategory.id) {
      return {
        categoryName: topCategory.name,
        topId: topCategory.id,
        subId: topCategory.id,
        subList: topCategory.category || [],
      }
    }

    if (topCategory.category) {
      for (const subCategory of topCategory.category) {
        if (subCategory.id === targetId) {
          return {
            categoryName: subCategory.name,
            topId: topCategory.id,
            subId: subCategory.id,
            subList: topCategory.category || [],
          }
        }
      }
    }
  }

  return {
    categoryName: '',
    topId: '',
    subId: '',
    subList: [],
  }
}

export default function HeaderContainer({ activeId }: { activeId: string }) {
  const router = useRouter()
  const [categoryName, setCategoryName] = useState<string>('')
  const [isActiveSub, setIsActiveSub] = useState<boolean>(false)
  const [selectedTopId, setSelectedTopId] = useState<string>('')
  const [selectedSubId, setSelectedSubId] = useState<string>('')
  const [subList, setSubList] = useState<Category[]>([])

  const toggleSub = () => setIsActiveSub(!isActiveSub)

  const handleClickBtn = (category: Category) => {
    if (category.category) {
      setSelectedTopId(category.id)
      setSubList(category.category)
    } else {
      router.push(`/products/${category.id}`)
      toggleSub()
    }
  }

  useEffect(() => {
    const result = getCategoryData(menuList, activeId)
    setSelectedTopId(result.topId)
    setSelectedSubId(result.subId)
    setSubList([...result.subList])
    setCategoryName(result.categoryName)
  }, [activeId])

  return (
    <>
      <Header>
        <ButtonBack />
        <ButtonCategoryTitle name={categoryName} showSub={toggleSub} />
        <ButtonCart />
      </Header>
      {isActiveSub && (
        <Snb
          selectedTopId={selectedTopId}
          selectedSubId={selectedSubId}
          subList={subList}
          handleClickBtn={handleClickBtn}
        />
      )}
    </>
  )
}
