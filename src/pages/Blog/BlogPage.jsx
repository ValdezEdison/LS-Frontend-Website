"use client";
import React, { useEffect, useContext, useState } from "react";
import styles from "./BlogPage.module.css";
import Header from "../../components/layouts/Header";
import BlogPostCard from "../../components/Blog/BlogPostCard";
import BlogSection from "../../components/Blog/BlogSection";
import Newsletter from "../../components/common/Newsletter";
import Footer from "../../components/layouts/Footer";
import ArticlesSection from "../../components/common/ArticlesSection";
import { fetchPosts, fetchCategories, fetchPostsByCategory, fetchTags, fetchMedia, fetchPostsByTag, fetchPostsForCategories } from "../../features/cms/wordpress/WordPressAction";
import { useDispatch, useSelector } from "react-redux";
import BlogTags from "../../components/Blog/BlogTags";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { WidgetSkeleton } from "../../components/skeleton/common/WidgetSkeleton";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPostsByTag, resetBlog } from "../../features/cms/wordpress/WordPressSlice";
import BlogCategories from "../../components/Blog/BlogCategories";

function BlogPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id, name } = location.state || {};

  const { posts, loading: postsLoading, error: postsError, categories, categoriesLoading, postsByCategory, postsByCategoryLoading, tags, LoadingTags, postsByTagLoading, postsByTag, postsForCategoriesLoading, postsForCategories } = useSelector((state) => state.cms.wordpress);

  const { language, languageId } = useContext(LanguageContext);
  const { isAuthenticated } = useSelector((state) => state.auth);


  const { t } = useTranslation("BlogSection");

  const [state, setState] = useState({
    tag: null,
    tagName: "",
    category: null, 
    categoryName: ""
  });


   // Group posts by category from the bulk fetch
   const getPostsGroupedByCategory = () => {
    if (!postsForCategories || !categories) return {};
    
    const grouped = {};
    
    // Initialize empty arrays for each category
    categories.forEach(category => {
      grouped[category.id] = [];
    });
    
    // Assign posts to their categories
    postsForCategories?.forEach(post => {
      post.categories?.forEach(categoryId => {
        if (grouped[categoryId]) {
          grouped[categoryId].push(post);
        }
      });
    });
    
    return grouped;
  };

  const postsGroupedByCategory = getPostsGroupedByCategory();


  // useEffect(() => {
  //   if(!state.tag){
  //     dispatch(resetPostsByTag());
  //     dispatch(fetchPosts({ per_page: 20 }));
  //     dispatch(fetchCategories({ per_page: 10 })).then((action) => {
  //       if (action.payload) {
  //         // Fetch posts for each category
  //         action.payload.forEach(category => {
  //           dispatch(fetchPostsByCategory({
  //             categoryId: category.id,
  //           }));
  //         });
  //       }
  //     });
  //     dispatch(fetchTags({ per_page: 100 }));
  //   }
  //   // dispatch(fetchPosts({ per_page: 20 }));
  //   // dispatch(fetchTags({ per_page: 100 }));
  //   // dispatch(fetchCategories({ per_page: 10 })).then((action) => {
  //   //   if (action.payload) {
  //   //     // Fetch posts for each category
  //   //     action.payload.forEach(category => {
  //   //       dispatch(fetchPostsByCategory({
  //   //         categoryId: category.id,

  //   //       }));
  //   //     });
  //   //   }
  //   // });
  // }, [dispatch, language, state.tag]);


  useEffect(() => {
    if (state.tag || state.category) return;
  
    const loadData = async () => {
      dispatch(resetBlog());
      dispatch(resetPostsByTag());
      // dispatch(fetchPosts({ per_page: 20 }));
      
      const categoriesAction = await dispatch(fetchCategories({ per_page: 100 }));
      if (categoriesAction.payload) {
        const categoryIds = categoriesAction.payload.map(c => c.id);
        dispatch(fetchPostsForCategories({categoryIds: categoryIds, per_page: 20}));
      }
      
      dispatch(fetchTags({ per_page: 100 }));
    };
  
    loadData();
  }, [dispatch, language, state.tag, state.category]); // Add all dependencies that truly affect this



  const handleNavActions = (e, id, action) => {

    if (action === "viewDetail") {
      navigate('/blog-detail', { state: { id } });
    } else if (action === "viewList") {
      // navigate('/blog-list');
      setState((prev) => ({ ...prev, category: id, categoryName: categories.find(category => category.id === id)?.name, tag: null, tagName: "" }));
    }
  }

  useEffect(() => {
   
    if(id && name){
      dispatch(fetchPostsByTag({ tagId: id, per_page: 20 }));
      setState({ tag: id, tagName: name });
    }

  }, []);

  useEffect(() => {
    if (state.tag) {
      dispatch(resetBlog());
      dispatch(fetchPostsByTag({ tagId: state.tag, per_page: 100 }));
   
    }

  }, [state.tag, dispatch]);

  useEffect(() => {
    if (state.category) {
      dispatch(resetBlog());
      const categoryIds = state.category
      dispatch(fetchPostsForCategories({categoryIds: categoryIds, per_page: 100}));
    }
  }, [state.category, dispatch]);

  return (
    <div className={styles.blogContainer}>
      <div className={styles.mainWrapper}>
        <Header />

        <main>

          <div className={styles.mainWrapper}>
            <div className="page-center">
              <div className={styles.blogHeaderWrapper}>
                <h1 className={styles.blogTitle}>{t('title')}</h1>
                {/* <BlogTags tags={tags} loading={LoadingTags} state={state} setState={setState} /> */}
                <BlogCategories categories={categories} loading={categoriesLoading} state={state} setState={setState} />
              </div>
              {/* <h2 className={styles.sectionTitle}>Últimos artículos</h2> */}
            </div>


          </div>
          {(postsForCategoriesLoading || categoriesLoading || postsByTagLoading) ? (
            [...Array(4)].map((_, i) => (
              <WidgetSkeleton key={i}/>
            ))
          )
          :
           state.tag ? (
            <ArticlesSection
              title={state.tagName}
              posts={postsByTag} 
              seeMore={false}
              handleNavActions={handleNavActions}
              tags={tags}
              layout="grid"  // Add this prop to indicate grid layout
              setState={setState}
            />
          ) : 
          state.category ? (
            <ArticlesSection
              title={state.categoryName}
              posts={postsForCategories} 
              seeMore={false}
              handleNavActions={handleNavActions}
              tags={tags}
              layout="grid"  // Add this prop to indicate grid layout
              setState={setState}
            />
          ) :
           (
            categories.map((category) => {
              const categoryPosts = postsGroupedByCategory[category.id] || [];
              if (categoryPosts.length > 0) {
                return (
                  <ArticlesSection
                    key={category.id}
                    title={category.name}
                    posts={categoryPosts}
                    seeMore={true}
                    handleNavActions={handleNavActions}
                    tags={tags}
                    layout="carousel"  // Default carousel layout
                    setState={setState}
                    categoryId={category.id}
                  />
                );
              }
              return null;
            })
          )}


        </main>
      </div>

     {!isAuthenticated && <Newsletter />}
      <Footer />
    </div>
  );
}

export default BlogPage;
