import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeState: 'inactive',
            rooms:[
                {
                    name:'Room 1',
                    status:'active',
                    checked:true
                },
                {
                    name:'Room 2',
                    status:'inactive',
                    checked:true
                },
                {
                    name:'Room 3',
                    status:'inactive',
                    checked:true
                },
                {
                    name:'Room 4',
                    status:'inactive',
                    checked:true
                }],
            checked:false,
            adult:[1,2],
            children:[0,1,2]
        }
    }

    toggleChecked = (i) => {
        let check = 'check_' + i
        this.refs[check].checked = !this.refs[check].checked
        console.log(this.refs[check].checked)
    }




    render() {
        const theme = {
            active: {
                primary:'#FFF',
                header:'#E6E6E6',
                border:'1px solid #E6E6E6'
            },
            inactive: {
                primary:'#DBDBE3',
                header:'#DBDBE3',
                border:'1px solid #CBCFDB'
            }
         }

         const Container = styled.div`
            padding: 20px 0 0 20px;
            display: flex;
            flex-wrap: wrap;
         `;

        const Box = styled.div`
            width: 200px;
            height: 165px; 
            margin: 0 5px 5px 0; 
            border-radius: 5px; 
            border: ${props => props.theme.active.border};
            background: ${props => props.theme.active.primary}
        `;

        const BoxHeader = styled.div`
            display: flex;
            align-items: center;
            font-size: .9em;
            height: 20%;
            padding-left: 5px;
            background: ${props => props.theme.active.header}
        `;

        //figure out checkbox color
        const CheckBox = styled.input.attrs({
            type: 'checkbox',
            class: 'radio'
        })`
            margin: 0 5px 0 0;
        `;

        const OptionsContainer = styled.div`
            width: 100%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        //figure out how to remove margin from h4 last-of-type
        const AgeFilter = styled.div`
            text-align: center;
            h4,h5{
                margin: 0 10px;
                padding-bottom: 5px;
            }
        `;

        //selectors
        const Selector = styled.select``;
        const Option = styled.option``;

        //submit
        const ButtonContainer = styled.div``;
        const Button = styled.button.attrs({
            type: 'submit'
        })`
            background: #C0C0C0;
            padding: 5px 10px;
            margin: 20px 0 0 20px;
            &:hover{
                cursor: pointer;
            }
        `;

    return (
    <ThemeProvider theme={theme}>
        <div>
            <Container>
                {this.state.rooms.map((room, i) =>
                <Box ref={'box_'+i}>
                    <BoxHeader>
                        {(i !== 0) ?
                            <div>
                                <CheckBox
                                    ref={'check_'+i}
                                    onChange={() =>
                                        this.toggleChecked(i)
                                    }
                                />
                                {room.name}
                             </div> : room.name}
                    </BoxHeader>
                    <OptionsContainer>
                        <AgeFilter>
                            <h4>Adults</h4>
                            <h5>(18+)</h5>
                            <Selector {...room.status}>
                                {this.state.adult.map(count => {
                                   return <Option>{count}</Option>
                                })}
                            </Selector>
                        </AgeFilter>
                        <AgeFilter>
                            <h4>Children</h4>
                            <h5>(0-17)</h5>
                            <Selector>
                                {this.state.children.map(count => {
                                    return <Option>{count}</Option>
                                })}
                            </Selector>
                        </AgeFilter>
                    </OptionsContainer>
                </Box>
                )}
            </Container>
            <ButtonContainer>
                <Button>
                    Submit
                </Button>
            </ButtonContainer>
        </div>
    </ThemeProvider>
    );
  }
}

export default App;
