'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IMenuBarList, ISubCategoryListItem, ITopCategoryListItem } from '@/types/category'
import { divideToTobSub, fetchCategories } from '@/services/header'
import Header from '@/components/header/header/Header'
import ButtonBack from '@/components/header/ButtonBack'
import ButtonCategoryTitle from '@/components/header/ButtonCategoryTitle'
import ButtonCart from '@/components/header/ButtonCart'
import Lnb from '@/components/header/lnb/Lnb'
import MenuBar from '@/components/header/menuBar/MenuBar'

const HeaderContainer = ({
  activeTopId,
  activeSubId,
}: {
  activeTopId: string
  activeSubId: string
}) => {
  const router = useRouter()
  const [categoryName, setCategoryName] = useState<string>('')
  const [isShowLnb, setIsShowLnb] = useState<boolean>(false)
  const [selectedTopId, setSelectedTopId] = useState<string>('')
  const [selectedSubId, setSelectedSubId] = useState<string>('')
  const [topList, setTopList] = useState<ITopCategoryListItem[]>([])
  const [subList, setSubList] = useState<IMenuBarList>({})

  const toggleLnb = () => setIsShowLnb(!isShowLnb)

  const setTopSubCategories = (category: ISubCategoryListItem) => {
    setSelectedTopId(category.topId)
    setSelectedSubId(category.id)

    let url = `/products?categoryTop=${category.topId}`

    if (category.topId !== category.id) {
      url += `&categorySub=${category.id}`
    }

    router.push(url)
  }

  const handleClickSub = (category: ISubCategoryListItem) => {
    setTopSubCategories(category)
    toggleLnb()
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await fetchCategories()
      const { name, topId, subId, topList, subList } = divideToTobSub(
        activeTopId,
        activeSubId,
        data,
      )
      setCategoryName(name)
      setSelectedTopId(topId)
      setSelectedSubId(subId)
      setTopList(topList)
      setSubList(subList)
    })()
  }, [activeTopId, activeSubId])

  return (
    <>
      <Header>
        <ButtonBack />
        <ButtonCategoryTitle name={categoryName} showSub={toggleLnb} />
        <ButtonCart />

        {isShowLnb && (
          <Lnb
            selectedTopId={selectedTopId}
            selectedSubId={selectedSubId}
            topList={topList}
            subList={subList[selectedTopId]}
            handleClickTop={(category: ITopCategoryListItem) => setSelectedTopId(category.id)}
            handleClickSub={handleClickSub}
          />
        )}
      </Header>

      {/* TODO. tabs 상품 목록 페이지로 이동..? */}
      <MenuBar
        selectedId={selectedSubId}
        menuList={subList[selectedTopId]}
        handleClick={setTopSubCategories}
      />
    </>
  )
}

export default HeaderContainer
