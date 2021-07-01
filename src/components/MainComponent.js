import React, { Component } from 'react';
import Home from './HomePage/HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent/MenuComponent';
import Contact from './ContactComponent';
import CourseDetail from './MenuComponent/CourseDetailComponent';
import Favorites from './FavoriteComponent/FavoriteComponent';
import Header from './CommonComponent/HeaderComponent';
import Footer from './CommonComponent/FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCourse, deleteCourseItem,postAddCourse, postAddCourseItem, postVideoUpload,postImageUpload, postComment, postFeedback, fetchCourses, fetchComments, fetchCourseItems, fetchPromos, fetchDevelopers,signupUser,fetchUserInfos, loginUser,logoutUser, fetchFavorites, postFavorite, deleteFavorite, receiveLogin } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
    return {
      courses: state.courses,
      comments: state.comments,
      promotions: state.promotions,
      developers: state.developers,
      favorites: state.favorites,
      courseItems: state.courseItems,
      auth: state.auth,
      signupStatus: state.signupStatus,
      userInfos: state.userInfos
    }
}


const mapDispatchToProps = (dispatch) => ({
  postComment: (courseId, rating, comment) => dispatch(postComment(courseId, rating, comment)),
  fetchCourses: () => {dispatch(fetchCourses())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  resetSignupForm: () => { dispatch(actions.reset('signup'))},
  resetLoginForm: () => { dispatch(actions.reset('login'))},
  resetAddCourseForm: () => { dispatch(actions.reset('addcourse'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchDevelopers: () => dispatch(fetchDevelopers()),
  fetchCourseItems: () => { dispatch(fetchCourseItems()) },
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  postAddCourse: (newCourse) => dispatch(postAddCourse(newCourse)),
  postImageUpload: (image) => dispatch(postImageUpload(image)),
  postAddCourseItem: (courseId, video, title, duration) => dispatch(postAddCourseItem(courseId, video, title, duration)),
  postVideoUpload: (video) => dispatch(postVideoUpload(video)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  signupUser: (creds) => dispatch(signupUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchUserInfos: () => dispatch(fetchUserInfos()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (courseId) => dispatch(postFavorite(courseId)),
  deleteFavorite: (courseId) => dispatch(deleteFavorite(courseId)),
  deleteCourseItem: (courseItemId) => dispatch(deleteCourseItem(courseItemId)),
  deleteCourse: (courseId) => dispatch(deleteCourse(courseId))
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchCourses();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchDevelopers();
    this.props.fetchFavorites();
    this.props.fetchUserInfos();
    this.props.fetchCourseItems();
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {

    const HomePage = () => {
      return(
        <Home course={this.props.courses.courses.filter((course) => course.featured)[0]}
          coursesLoading={this.props.courses.isLoading}
          coursesErrMess={this.props.courses.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          developer={this.props.developers.developers.filter((developer) => developer.featured)[0]}
          developerLoading={this.props.developers.isLoading}
          developerErrMess={this.props.developers.errMess}
          developers={this.props.developers} 
        />
      );
    }

    const CourseWithId = ({match}) => {

      return(
         this.props.auth.isAuthenticated 
        ?
        <CourseDetail course={this.props.courses.courses.filter((course) => course._id === match.params.courseId)[0]}
          isLoading={this.props.courses.isLoading}
          errMess={this.props.courses.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.course === match.params.courseId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          favorite={this.props.favorites.favorites ? this.props.favorites.favorites.courses.some((course) => course._id === match.params.courseId) : false}
          //favorite={this.props.favorites.favorites.courses.some((course) => course._id === match.params.courseId)}
          postFavorite={this.props.postFavorite}
          courseItems={this.props.courseItems.courseItems.filter((courseItem) => courseItem.course === match.params.courseId)}
          user={this.props.userInfos.userInfos} 
          auth={this.props.auth}
          postAddCourseItem={this.props.postAddCourseItem}
          postVideoUpload={this.props.postVideoUpload}
          deleteCourseItem={this.props.deleteCourseItem}
          />
        :
        <CourseDetail course={this.props.courses.courses.filter((course) => course._id === match.params.courseId)[0]}
          isLoading={this.props.courses.isLoading}
          errMess={this.props.courses.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.course === match.params.courseId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          favorite={false}
          postFavorite={this.props.postFavorite}
          courseItems={this.props.courseItems.courseItems.filter((courseItem) => courseItem.course ===match.params.courseId)}
          user={this.props.userInfos.userInfos} 
          auth={this.props.auth}
          postAddCourseItem={this.props.postAddCourseItem}
          postVideoUpload={this.props.postVideoUpload}
          deleteCourseItem={this.props.deleteCourseItem}
          />
      );
    }

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/home',
              state: { from: props.location }
            }} />
      )} />
    );

    return (
      <div>
        <Header auth={this.props.auth} 
          signupUser={this.props.signupUser} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser} 
          resetLoginForm={this.props.resetLoginForm}
          resetSignupForm={this.props.resetSignupForm}
          signupStatus={this.props.signupStatus}
          />   
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <Menu courses={this.props.courses} deleteCourse={this.props.deleteCourse} auth={this.props.auth}  postImageUpload={this.props.postImageUpload}  user={this.props.userInfos.userInfos} resetAddCourseForm={this.props.resetAddCourseForm} postAddCourse={this.props.postAddCourse} />} />
              <Route path="/menu/:courseId" component={CourseWithId} />
              <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
