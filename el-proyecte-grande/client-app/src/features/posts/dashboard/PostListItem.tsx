import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';
import { useStore } from '../../../app/stores/store';
import {format} from 'date-fns';

interface Props{
    post: Post
}

export default function PostListItem({post}: Props) {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={'/assets/dalmatian.jpg'}/> {/* post.petPhoto*/}

                        <Item.Content>
                            <Item.Header as ={Link} to={`/posts/${post.id}`}>
                                {post.title}
                            </Item.Header>
                            
                                {post.username &&
                                <Item.Description>
                                Posted by <Link to={`/profiles/${post.username}`}>{post.username}</Link>
                                </Item.Description>
                                }
                                
                            
                        </Item.Content>
                    </Item>

                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' />{format(post.date!, 'dd MMM yyyy')}
                    <Icon name='marker'/>{post.location}
                    
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    {post.description}
                </span>
                
            </Segment>
            <Segment>
                <span>
                <p></p>
                <Button as={Link} to={`/pet/${post.petType}`} color='grey' floated='left' style={{padding: "7px", marginTop:"-20px"}}  content={post.petType.toLowerCase()}/>
                <Button as={Link} to={`/posts/${post.id}`} color='teal' floated='right' style={{padding: "7px", marginTop:"-20px", marginLeft: "10px"}} content='View'/>  
                </span>
            </Segment>
        </Segment.Group>
    )
}