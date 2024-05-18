'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { menuList } from '@/constants/products'
import { ICategory, TFromClickType } from '@/types/product'
import { getCategoryData } from '@/services/header'
import Header from '@/components/header/Header/Header'
import ButtonBack from '@/components/header/ButtonBack'
import ButtonCategoryTitle from '@/components/header/ButtonCategoryTitle'
import ButtonCart from '@/components/header/ButtonCart'
import Lnb from '@/components/header/Lnb/Lnb'
import SubMenu from '@/components/header/SnbMenu/SubMenu'

const HeaderContainer = ({ activeId }: { activeId: string }) => {
  const router = useRouter()
  const [categoryName, setCategoryName] = useState<string>('')
  const [isActiveSub, setIsActiveSub] = useState<boolean>(false)
  const [selectedTopId, setSelectedTopId] = useState<string>('')
  const [selectedSubId, setSelectedSubId] = useState<string>('')
  const [subList, setSubList] = useState<ICategory[]>([])

  const toggleSub = () => setIsActiveSub(!isActiveSub)

  const handleClick = (category: ICategory, from: TFromClickType) => {
    if (category.category) {
      setSelectedTopId(category.id)
      setSubList(category.category)
      return
    }

    router.push(`/products?category=${category.id}`)

    if (from === 'lnb') {
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
      <SubMenu selectedSubId={selectedSubId} subList={subList} handleClick={handleClick} />
      {isActiveSub && (
        <Lnb
          selectedTopId={selectedTopId}
          selectedSubId={selectedSubId}
          subList={subList}
          handleClick={handleClick}
        />
      )}
    </>
  )
}

export default HeaderContainer
