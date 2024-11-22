import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../apiClient";
import { allProducts, handlePagination } from "../app/reducers/CartSlice";
import PaginationComponent from "../components/PaginationComponent";
import ProductCard from "../components/ProductCard";
import { Accordion } from "react-bootstrap";


const Products = () => {
  const dispatch = useDispatch();
  const { userId, token } = useSelector((state) => state.loggedInData);

  const { products } = useSelector((state) => state.CartSlice);

  const { currentPage, totalPage, productsPerPage  } = useSelector(
    (state) => state.CartSlice.pagination
  );

  const fetchAllProducts = async (page) => {
    try {
      const res = await apiClient.get(
        `/all-products/?page=${currentPage}&limit=${productsPerPage}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(allProducts(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts(currentPage);
  }, [currentPage, userId]);

  const handleChangePage = (event, newPage) => {
    dispatch(handlePagination(newPage));
  };

  return (
    <>
      <section class="shop spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <div class="shop__sidebar">
                <div class="shop__sidebar__search">
                  <form action="#">
                    <input type="text" placeholder="Search..." />
                    <button type="submit">
                      <span class="icon_search"></span>
                    </button>
                  </form>
                </div>
                <div className="shop__sidebar__accordion">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Categories</Accordion.Header>
                      <Accordion.Body>
                        <ul>
                          <li>
                            <a href="#">Men (20)</a>
                          </li>
                          <li>
                            <a href="#">Women (20)</a>
                          </li>
                          <li>
                            <a href="#">Bags (20)</a>
                          </li>
                          <li>
                            <a href="#">Clothing (20)</a>
                          </li>
                          <li>
                            <a href="#">Shoes (20)</a>
                          </li>
                          <li>
                            <a href="#">Accessories (20)</a>
                          </li>
                          <li>
                            <a href="#">Kids (20)</a>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
            <div class="col-lg-9">
              <div class="shop__product__option">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="shop__product__option__left">
                      <p>Showing 1–12 of 126 results</p>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="shop__product__option__right">
                      <p>Sort by Price:</p>
                      <select>
                        <option value="">Low To High</option>
                        <option value="">$0 - $55</option>
                        <option value="">$55 - $100</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              {/* Pagination Section */}
              <div>
                <PaginationComponent
                  currentPage={currentPage}
                  totalPage={totalPage}
                  handleChangePage={handleChangePage}
                />
                <p>{currentPage} of {totalPage}</p>
              </div>  
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
