'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ICategoriesData,
  IMenuBarList,
  ISubCategoryListItem,
  ITopCategoryListItem,
} from '@/types/category'
import { IProductListParams } from '@/types/product'
import { divideToTobSub, fetchCategories } from '@/services/header'
import { paramsToString } from '@/utils/queryParams'
import Header from '@/components/headerContainer/header/Header'
import ButtonBack from '@/components/headerContainer/btns/ButtonBack'
import ButtonCategoryTitle from '@/components/headerContainer/btns/ButtonCategoryTitle'
import ButtonCart from '@/components/headerContainer/btns/ButtonCart'
import Lnb from '@/components/headerContainer/lnb/Lnb'
import MenuBar from '@/components/headerContainer/menuBar/MenuBar'
import SkeletonMenuBar from '@/components/headerContainer/skeletonMenuBar/SkeletonMenuBar'
import styles from '@/components/headerContainer/HeaderContainer.module.scss'

const HeaderContainer = ({
  activeTopId,
  activeSubId,
}: {
  activeTopId: string
  activeSubId?: string
}) => {
  const router = useRouter()
  const [categoryName, setCategoryName] = useState<string>('')
  const [isShowLnb, setIsShowLnb] = useState<boolean>(false)
  const [selectedTopId, setSelectedTopId] = useState<string>('')
  const [selectedSubId, setSelectedSubId] = useState<string>('')
  const [topList, setTopList] = useState<ITopCategoryListItem[]>([])
  const [subList, setSubList] = useState<IMenuBarList>({})

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const { data } = await fetchCategories()
      setFetchData(data)
    }

    fetchCategoriesData()
  }, [activeTopId, activeSubId])

  const toggleLnb = () => setIsShowLnb(!isShowLnb)

  const setTopSubCategories = (category: ISubCategoryListItem) => {
    setSelectedTopId(category.topId)
    setSelectedSubId(category.id)

    let params = { categoryTop: category.topId } as IProductListParams

    if (category.topId !== category.id) {
      params.categorySub = category.id
    }

    // url 변경
    const queryString = paramsToString(params)
    const newUrl = `${window.location.pathname}?${queryString}`
    router.push(newUrl)
  }

  const handleClickSub = (category: ISubCategoryListItem) => {
    setTopSubCategories(category)
    toggleLnb()
  }

  const setFetchData = (data: ICategoriesData[]) => {
    const { name, topId, subId, topList, subList } = divideToTobSub(
      activeTopId,
      activeSubId ? activeSubId : '',
      data,
    )
    setCategoryName(name)
    setSelectedTopId(topId)
    setSelectedSubId(subId)
    setTopList(topList)
    setSubList(subList)
  }

  return (
    <>
      <div className={styles.headerContainer}>
        <Header>
          <ButtonBack />
          <ButtonCategoryTitle name={categoryName} showSub={toggleLnb} />
          {/*<ButtonCart />*/}
        </Header>

        {subList[selectedTopId] ? (
          <MenuBar
            selectedId={selectedSubId}
            menuList={subList[selectedTopId]}
            handleClick={setTopSubCategories}
          />
        ) : (
          <SkeletonMenuBar />
        )}
      </div>

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
    </>
  )
}

export default HeaderContainer
