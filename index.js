const addNewBtn=document.querySelector("#add-btn");
const taskInput=document.querySelector("#wrapper input");
const taskContainer = document.querySelector(".tasks");
const errorMssg=document.querySelector("#error");
const count=document.querySelector(".count-value");

let taskCount=0;

const displayCount=(taskCount)=>{
    count.innerText=taskCount;
}

const addNewTask=()=>
{
    const taskName= taskInput.value.trim();
    errorMssg.style.display="none";
    if(!taskName)
    {
        setTimeout(()=>{
            errorMssg.style.display="block";
        },200);
        return;
    }

        const task= `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>

        <button class="edit">
        <i class="fa-solid fa-pen"></i>
        </button>

        <button class="delete">
        <i class="fa-solid fa-trash"></i>
        </button>

        </div>`;
        
        taskContainer.insertAdjacentHTML("beforeend",task);
        const deleteButtons=document.querySelectorAll(".delete");
        deleteButtons.forEach((button)=>{
            button.onclick=()=>{
                const taskCheck = button.parentNode.querySelector(".task-check");
                if (!taskCheck.checked) {
                    taskCount -= 1;
                }
                button.parentNode.remove();
                displayCount(taskCount);
            };
        }
        );
    


        const editButtons=document.querySelectorAll(".edit");
        editButtons.forEach((editBtn)=>{
            editBtn.onclick=(e)=>{
                let targetElement=e.target;
                if(!(e.target.className=="edit"))
                {
                    targetElement=e.target.parentElement;

                }
                taskInput.value=targetElement.previousElementSibling?.innerText;
                targetElement.parentNode.remove();
                taskCount-=1;
                displayCount(taskCount);
            };
        });

        const disableEditButton = (checkBox) => {
            const editButton = checkBox.nextElementSibling.nextElementSibling; 
             editButton.disabled = checkBox.checked;
        };

        const taskCheck= document.querySelectorAll(".task-check");
        taskCheck.forEach((checkBox)=>{
            checkBox.onchange=()=>{
                checkBox.nextElementSibling.classList.toggle("completed");
                disableEditButton(checkBox);
                if(checkBox.checked)
                {
                    
                    taskCount-=1;
                }
                else
                {
                    taskCount+=1;
                }
                displayCount(taskCount);
            };
    });

taskCount+=1;
displayCount(taskCount);
taskInput.value=""

};

addNewBtn.addEventListener("click",addNewTask);

window.onload = () => {
        taskCount=0;
        displayCount(taskCount);
        taskInput.value="";
}
