import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../../helpers/input';
import request, { getUser } from '../../helpers/helper';

class UserProfile extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         user: {},
         user_firstname: '',
         user_lastname: '',
      }
   }

   componentDidMount() {
      request.get(`${getUser()}/home`).then(response => {
         this.setState({
            user: response[0],
         });
      });
   }

   getFirstname(firstname) {
      this.setState({
         user_firstname: firstname,
      })
   }

   getLastname(lastname) {
      this.setState({
         user_lastname: lastname,
      })
   }

   saveUser() {
      if (this.state.user_firstname && this.state.user_lastname) {

         const updatedUser = {
            firstname: this.state.user_firstname,
            lastname: this.state.user_lastname,
            id: this.state.user._id,
         }

         request.post(`updateUser.js`, updatedUser, (xhttp) => {
            const response = JSON.parse(xhttp.response);

            if (response.update) {
               this.setState({
                  user: response.response,
               });
               window.location.reload();
            } else {
               alert('Error');
            }
         })
      }
   }

   deleteUser() {
      request.post(`deleteUser.js`, { id: this.state.user._id });
      alert('User Deleted Successfully');
      this.props.history.push({
         pathname: '/'
      });
   }

   render() {
      try {
         return (
            <Fragment>
               {
                  this.state.user &&
                  <div className="col-sm p-0 mx-auto">
                     <div className="col-sm p-0 d-flex justify-content-between">
                        <Input class="col-sm-5 p-0" id="firstname" type="text" placeholder={this.state.user.firstname} value={this.getFirstname.bind(this)} />
                        <Input class="col-sm-5 p-0" id="lastname" type="text" placeholder={this.state.user.lastname} value={this.getLastname.bind(this)} />
                     </div>
                     <div className="col-sm-2 mx-auto mt-4 p-0 d-flex justify-content-between">
                        <button className="btn btn-info btn-sm col-sm-5" onClick={() => this.saveUser()}>Save</button>
                        <button className="btn btn-danger btn-sm col-sm-5" onClick={() => this.deleteUser()}>Delete</button>
                     </div>
                  </div>
               }
            </Fragment>
         )
      } catch (e) {
         console.log(e);
      }
   }
}

export default withRouter(UserProfile);