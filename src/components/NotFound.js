import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import {Redirect} from 'react-router-dom';




//USAGE:
// <SongList songs={songs} userId={1}/>

const styles = theme => ({
  paper: {
    width:'100%', 
    marginTop: '20px',
    justify: 'center', 
    overflowX: 'auto'
  },
  table: {
    minWidth: 700,    
    width: '100%',
  },
  image: {
    height:'100%', 
    width: '100%', 
    objectFit: 'cover'
  }, 
  tablecell: {
    fontSize: '12pt', 
    marginTop: 25
  }

});

export class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state ={
      redirect: false
    }
  }
  goHome = () => {
    this.setState({redirect: true});
  }
  render() {
      if (this.state.redirect) {
        return <Redirect push to="/" />;
      } else {
        return(
          <div>
            
          <Typography variant='h3' style={{paddingTop: 100, paddingBottom: 100}}> 404 Page Not Found</Typography> 
        
                      <Grid container spacing={24} >
                        <Grid item xs={6}> 
                          <Typography variant='h4'  style={{paddingTop: 50}} > No Music to be found here  </Typography> 
                          <Typography variant='h5' style={{paddingTop: 100}}> Find your way back to good music  </Typography> 
                          <Button style={{background: 'linear-gradient(45deg, #647DEE 30%, #7F53AC 90%)', color:'white', marginTop: 50, height: 60, width: 200, fontSize: 24}} onClick={this.goHome}>Go Back</Button> 
                        </Grid>
                        <Grid item xs={6}>

                          <div style ={{paddingTop: '50%', position: 'relative', marginRight: 100}}>
                          <iframe 
                          src="https://gifer.com/embed/8ddl" 
                          style={{ width:'80%', height:'100%',position:'absolute', top: 0, left:0,  frameBorder:0, allowFullScreen: true}}></iframe>
                          </div><p><a href="https://gifer.com">via GIFER</a></p>
                        </Grid>
        
                      </Grid>
          </div>
        )
      }

    
}
}





export default withStyles(styles)(NotFound);
