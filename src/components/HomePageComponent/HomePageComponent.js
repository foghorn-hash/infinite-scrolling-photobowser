import React, { Component } from 'react';
import Axios from 'axios';
import './HomePageComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfiniteScroll from 'react-infinite-scroller';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LOADING from "../../1487-loading.gif";
import { useLocation } from "react-router-dom";
import ReactDOM from 'react-dom';
import Spinner from 'react-bootstrap/Spinner';
import Modal from '../Modal/Modal.js';
import isEmpty from "lodash/isEmpty";
import Image from 'react-bootstrap/Image';

const withLocation = Component => props => {
    const location = useLocation();
  
    return <Component {...props} location={location} />;
};

function paginator(items, current_page, per_page_items) {
    let page = current_page || 1,
    per_page = per_page_items || 10,
    offset = (page - 1) * per_page,

    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);

    return {
        page: page,
        per_page: per_page,
        prev_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
};

class HomePageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            usersAll: [],
            currentPage: 1,
            show: false,
	        showSpinner: true,
	        showPhoto: false,
	        isLoading: true,
            error: null,
            photoClicked: function photoClicked(photoId, state) {
				
                var title = "";
                var url = "";		  
                  
                Axios.get('https://jsonplaceholder.typicode.com/photos/'+photoId, { crossdomain: true })
                      .then(response => {
                          title = response.data.title;
                          url = response.data.url;
                          const rootElementDetails = document.getElementById("modalPhoto");
                      
                          ReactDOM.render(
                              <div>
                                <p>{title.substring(0, 10)+"..."}</p>
                                <Image src={url} className="PhotoLoader-large" fluid />
                              </div>,
                              rootElementDetails
                          );
                      });
              }
        };
    };

    async componentDidMount() {
        let resultAll = await Axios.get('https://jsonplaceholder.typicode.com/photos');
        this.setState({usersAll: resultAll.data});
        this.setState({users: paginator(resultAll.data, 1, 6).data});
    };

    showModal = () => {
        this.setState({ show: true });
        setTimeout(() => {
            this.setState({ isLoading: false });
            this.setState({ showSpinner: false });
            this.setState({ showPhoto: true });
        }, 3600);
    };
    
    hideModal = () => {
        this.setState({ show: false });
        this.setState({ isLoading: true });
        this.setState({ showSpinner: true });
        this.setState({ showPhoto: false });
    };

    onClick(photoId, state) {
        this.state.photoClicked(photoId, state);
        this.showModal();
        //console.log(this.state.showSpinner);
      };

    render() {

        if (this.state.users.length == 0) {
            return <div className="loading-screen"><img src={LOADING} alt="Loading..." /></div>;
        }

        const getNewUsers = async () => {
            const currentPage = this.state.currentPage + 1;
            const paginatedUsers = paginator(this.state.usersAll, currentPage, 6);
            this.setState({ users: [...this.state.users, ...paginatedUsers.data], currentPage });
        }
      
        return (
            <div className="HomePage">
                <Modal show={this.state.show} showSpinner={this.state.showSpinner} showPhoto={this.state.showPhoto} handleClose={this.hideModal}>
                    {
                        this.state.isLoading ? (
                        <>
                        <p>Loading...</p>
                        <Spinner animation="grow" className="PhotoLoader-modal-hidden" />
                        </>
                        ) : !isEmpty(this.state.photos) ? (
                        <div></div>
                        ) : (
                        <div></div>
                        )
                    }
                </Modal>
                <InfiniteScroll
                    pageStart={1}
                    loadMore={getNewUsers}
                    hasMore={this.state.usersAll.length > this.state.users.length}
                    threshold={100}
                > 
                    <Row xs={1} md={3} className="g-4">
                    {this.state.users.map((i, index) => (
                            <Col style={{ flexBasis: "33%" }}>
                                <div className="animated-card">
                                    <Card className="Card">
                                        <Card.Img className="CardImg" variant="top" src={i.thumbnailUrl} />
                                        <Card.ImgOverlay className="CardOverLay d-flex justify-content-center align-items-center">
                                            <Card.Title className="CardTitle">{i.title.charAt(0)}</Card.Title>
                                        </Card.ImgOverlay>
                                        <Card.Body>
                                        <Card.Title>{i.title.substring(0, 10)+"..."}</Card.Title>
                                        <Button className="CardButton" variant="primary" onClick={() => this.onClick(i.id, this.state) }>LARGE PHOTO</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                    ))}
                    </Row>
                </InfiniteScroll>
            </div>
            );
	};

}

export default withLocation(HomePageComponent);