import React from 'react'
import { Header, Segment, List, Table, Loader, Dimmer } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './StudentCourseList.css'

function StudentCourseList (props){
    const { id, studentsCourses, courseRouteFn, calculatePercentFn, assignments } = props;
    const courseList = studentsCourses.map( course => {
        let courseAssignments = assignments.filter( assignment => {
            return assignment.course_id === course.course_id
        }).filter( assignment => {
            return assignment.point_scored !== null
        })
        let coursePercent = calculatePercentFn(courseAssignments)
        return(
        <Table.Row onClick={ () => courseRouteFn(course.course_id)} key={`${course.name}${course.id}`}>
            <Table.Cell> {course.course_name}</Table.Cell>
            <Table.Cell>{course.teacher_name}</Table.Cell>
            {
                course.percent
                ?<Table.Cell>{course.percent}</Table.Cell>
                :<Table.Cell>{coursePercent.percent}%</Table.Cell>
            }
            {
                course.letterGrade
                ?<Table.Cell>{course.letterGrade}</Table.Cell>
                :<Table.Cell>{coursePercent.letter}</Table.Cell>
            }

        </Table.Row>)
        
    })
    return(
        <div className='course-list'>
            
            <Segment>
            {studentsCourses.length !== 0
            ?<div>
                <Header as='h1'>My Courses</Header>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Course</Table.HeaderCell>
                            <Table.HeaderCell>Teacher</Table.HeaderCell>
                            <Table.HeaderCell>Percent</Table.HeaderCell>
                            <Table.HeaderCell>Grade</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {courseList}
                    </Table.Body>
                </Table>
                </div>
            //     :<Dimmer active>
            //     <Loader/>
            // </Dimmer>
            :<div>No classes yet!</div>
            }
            </Segment>
            
            
        </div>
    )
}
export default StudentCourseList;