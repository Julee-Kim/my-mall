'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { menuList } from '@/constants/products'
import { ICategory } from '@/types/product'
import { getCategoryData } from '@/services/header'
import Header from '@/components/header/header/Header'
import ButtonBack from '@/components/header/ButtonBack'
import ButtonCategoryTitle from '@/components/header/ButtonCategoryTitle'
import ButtonCart from '@/components/header/ButtonCart'
import Lnb from '@/components/header/lnb/Lnb'
import Tabs from '@/components/tabs/Tabs'

const HeaderContainer = ({ activeId }: { activeId: string }) => {
  const router = useRouter()
  const [categoryName, setCategoryName] = useState<string>('')
  const [isActiveSub, setIsActiveSub] = useState<boolean>(false)
  const [selectedTopId, setSelectedTopId] = useState<string>('')
  const [selectedSubId, setSelectedSubId] = useState<string>('')
  const [subList, setSubList] = useState<ICategory[]>([])

  const toggleSub = () => setIsActiveSub(!isActiveSub)

  const handleClickLnb = (category: ICategory) => {
    if (category.category) {
      setSelectedTopId(category.id)
      setSubList(category.category)
      return
    }

    router.push(`/products?category=${category.id}`)
    toggleSub()
  }

  const handleClickTab = (tab: ICategory) => {
    if (tab.category) {
      setSelectedTopId(tab.id)
      setSubList(tab.category)
      return
    }

    router.push(`/products?category=${tab.id}`)
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
      <Tabs selectedId={selectedSubId} tabList={subList} handleClick={handleClickTab} />
      {isActiveSub && (
        <Lnb
          selectedTopId={selectedTopId}
          selectedSubId={selectedSubId}
          subList={subList}
          handleClick={handleClickLnb}
        />
      )}
    </>
  )
}

export default HeaderContainer
