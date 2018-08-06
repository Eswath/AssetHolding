import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import codingLogo from '../Images/coding.jpg'
import LoginForm from './LoginForm'

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
};

function SimpleMediaCard(props) {
    const { classes, handleSubmit } = props;
    return (
        <div>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={codingLogo}

                />

                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        Codingmart Technologies
                    </Typography>
                    <Typography component="div">
                        <LoginForm onSubmit={handleSubmit}/>
                    </Typography>
                </CardContent>
                {/*<CardActions>*/}
                    {/*<Button size="small" color="primary">*/}
                        {/*Share*/}
                    {/*</Button>*/}
                    {/*<Button size="small" color="primary">*/}
                        {/*Learn More*/}
                    {/*</Button>*/}
                {/*</CardActions>*/}
            </Card>
        </div>
    );
}



export default withStyles(styles)(SimpleMediaCard);
