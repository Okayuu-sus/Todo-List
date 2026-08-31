import { useState } from 'react';

export default function App() {
    const [val, setVal] = useState(); 
    const [todo, setTodo] = useState([["Like this video 👍🏻",0], ["Subscribe to Coding in Flow 📺",1], ["Leave a nice comment 😊",2]]);
    const [active, setActive] = useState([["Like this video 👍🏻",0], ["Subscribe to Coding in Flow 📺",1], ["Leave a nice comment 😊",2]]);
    const [nonActive, setNonActive] = useState([]);

    const sortArray = (tempArr) => {
        let tempArray = [...tempArr];
        for(let i = 0; i < tempArray.length-1; i++) {
            let minIndex = i;
            for (let j = i+1; j < tempArray.length; j++) {
                if (tempArray[j][1] < tempArray[i][1])
                    minIndex = j;
            }
            let temp = [...tempArray[i]];
            tempArray[i] = [...tempArray[minIndex]];
            tempArray[minIndex] = [...temp];
        }
        return tempArray;
    }

    const handleSearch = (event) => {
        event.preventDefault();
        clickAdd();
    }
    
    const change = (event) => {
        setVal(event.target.value);
    }

    const clickAdd = () => {
        if (!val) return;
        let tempVar = [val, todo.length];
        setTodo(todo => {
            return [...todo, tempVar];
        });
        setActive(active => {
            return [...active, tempVar];
        })
        setVal('');
    }

    const deleteActive = (indexRemove) => {
        setTodo(todo => {
            let updatedList = todo.map(value => [...value]);
            for(let i = indexRemove+1; i<updatedList.length; i++) {
                updatedList[i][1] -= 1;
            }
            updatedList = updatedList.filter((_,index) => index !== indexRemove);
            return updatedList;
        })

        setActive(active => {
            let updatedList = active.map(value => [...value]);
            let targetIndex = 0;
            while (updatedList[targetIndex][1] < indexRemove) 
                targetIndex += 1;
            for(let i = targetIndex + 1; i<updatedList.length; i++) {
                updatedList[i][1] -=1;
            }
            updatedList = updatedList.filter((_,index) => index !== targetIndex);
            return updatedList;
        })

        setNonActive(nonActive => {
            if (nonActive.length == 0) return [];
            let updatedList = nonActive.map(value => [...value]);;
            let targetIndex = 0;
            while(updatedList[targetIndex][1] < indexRemove) {
                targetIndex +=1;
                if (!updatedList[targetIndex]) break;
            }
            for (let i = targetIndex; i<updatedList.length; i++) {
                updatedList[i][1] -=1;
            }
            return updatedList;
        })
    }

    const deleteNonActive = (indexRemove) => {
        setTodo(todo => {
            let updatedList = todo.map(value => [...value]);
            for(let i = indexRemove+1; i<updatedList.length; i++) {
                updatedList[i][1] -= 1;
            }
            updatedList = updatedList.filter((_,index) => index !== indexRemove);
            return updatedList;
        })

        setNonActive(nonActive => {
            let updatedList = nonActive.map(value => [...value]);
            let targetIndex = 0;
            while (updatedList[targetIndex][1] < indexRemove) 
                targetIndex += 1;
            for(let i = targetIndex + 1; i<updatedList.length; i++) {
                updatedList[i][1] -=1;
            }
            updatedList = updatedList.filter((_,index) => index !== targetIndex);
            return updatedList;
        })

        setActive(active => {
            if (active.length == 0) return [];
            let updatedList = active.map(value => [...value]);;
            let targetIndex = 0;
            while(updatedList[targetIndex][1] < indexRemove) {
                targetIndex +=1;
                if (!updatedList[targetIndex]) break;
            }
            for (let i = targetIndex; i<updatedList.length; i++) {
                updatedList[i][1] -=1;
            }
            return updatedList;
        })
    }

    const clickActive = (value) => {
        setActive(active.filter(index => index[1] !== value[1]));
        setNonActive(nonActive => {
            let tempArray = sortArray([...nonActive, value]);
            return tempArray;
        })
    }

    const clickNonActive = (value) => {
        setNonActive(nonActive.filter(index => index[1] !== value[1]));
        setActive(active => {
            let tempArray = sortArray([...active, value]);
            return tempArray;
        })
    }

    const clickDeleteAll = () => {

        let updatedList = todo.map(item => [...item]);
        for(let i=0; i<todo.length; i++) {
            let subOffset = 0;
            for (let j=0; j<nonActive.length;j++) {
                if(nonActive[j][1] < todo[i][1]) {
                    subOffset ++;
                    // console.log("["+nonActive[j][0]+","+nonActive[j][1]+"] vs ["+updatedList[i][0]+","+updatedList[i][1]+"]");
                }
            }
            updatedList[i][1] -= subOffset;
        }

        for (let i=0; i<nonActive.length; i++) {
            updatedList = updatedList.filter((_,index) => index !== (nonActive[i][1]-i));
        }
    
        setTodo(updatedList)
        setActive(updatedList)
        setNonActive([]);
    }

    return (
        <div className='body'>
            <h1 className='title'>Your Todos</h1>
            <div className="todo">
                <form className="search-wrapper" onSubmit={handleSearch}>
                    <input type="search" onChange={change} value={val} placeholder='What needs to be done?' id="search" className="search"/>
                    <button onClick={clickAdd}>Add</button>
                </form>
                <div className="display">
                    {todo.length === 0 ? (
                        <p className='not-display-title'>No todos yet. Add a new one above.</p>
                    ) : (
                        <div className="todo-each">
                            {active.toReversed().map((value) => (
                                <>
                                    <div className="todo-body" key={value[1]}>
                                        <div className="body-text" onClick={() => {clickActive(value)}}>
                                            <input type="checkbox" checked={false}></input>
                                            <span>{value[0]}</span>
                                        </div>
                                        <button onClick={() => {deleteActive(value[1])}}>
                                            <img src="../public/delete.png" alt="" />
                                        </button>
                                    </div>
                                </>
                            ))}
                            {nonActive.toReversed().map((value) => (
                                <>
                                    <div className="todo-body todo-active" key={value[1]}>
                                        <div className="body-text" onClick={() => {clickNonActive(value)}}>
                                            <input type="checkbox" checked={true}></input>
                                            <span>{value[0]}</span>
                                        </div>
                                        <button onClick={() => {deleteNonActive(value[1])}}>
                                            <img src="../public/delete.png" alt="" />
                                        </button>
                                    </div>                                   
                                </>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <footer>
                <p className="footer-complete">{nonActive.length}/{todo.length} todos completed</p>
                {nonActive.length !== 0 ? (
                    <p className="footer-delete" onClick={clickDeleteAll}>Delete all completed</p>
                ): (<></>)
                }
            </footer>
        </div>
    )
}
