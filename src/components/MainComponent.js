import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import CourseDetail from './CourseDetailComponent';
import Favorites from './FavoriteComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchCourses, fetchComments, fetchCourseItems, fetchPromos, fetchDevelopers, loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite } from '../redux/ActionCreators';
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
      auth: state.auth
    }
}


const mapDispatchToProps = (dispatch) => ({
  postComment: (courseId, rating, comment) => dispatch(postComment(courseId, rating, comment)),
  fetchCourses: () => {dispatch(fetchCourses())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchDevelopers: () => dispatch(fetchDevelopers()),
  fetchCourseItems: () => { dispatch(fetchCourseItems()) },
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (courseId) => dispatch(postFavorite(courseId)),
  deleteFavorite: (courseId) => dispatch(deleteFavorite(courseId))
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchCourses();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchDevelopers();
    this.props.fetchFavorites();
    this.props.fetchCourseItems();
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
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser} 
          />   
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path='/aboutus' component={() => <About developers={this.props.developers} />} />
              <Route exact path="/menu" component={() => <Menu courses={this.props.courses} />} />
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
