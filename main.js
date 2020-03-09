document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  if(description === "" || severity === "" || assignedTo === "")
  {
    alert("Please fill the all Filed")
  }
  else
  {

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')){
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();

  }
  
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id.toString());
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue => issue.id !== id.toString() )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues()
}

const issueCount = issues =>{
    const getIssueSpan = id => document.getElementById(id)
    const total = getIssueSpan("total-issue")
    const open = getIssueSpan("open-issue")
    const closed = getIssueSpan("closed-issue")
    if(issues.length === undefined)
    {
      total.innerText = 0
      open.innerText = 0
      closed.innerText = 0
    }
    else
    {
      const totalIssue = issues.length
      const totalOpenIssue = issues.filter(openIssues => openIssues.status === "Open").length
      const totalClosedIssue = totalIssue - totalOpenIssue

      total.innerText = totalIssue
      open.innerText = totalOpenIssue
      closed.innerText = totalClosedIssue
    }
    
}


const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues')) || 0; // set default value 0 and fixed null error
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  issueCount(issues)

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
    
    // for Strike Line
    let newDescription = "";
    let labelColor = ""
    if(status==="Closed")
    {
      newDescription = "<s>"+description+"</s>";
      labelColor = "label-success"
    }
    else
    {
      newDescription = description;
      labelColor = "label-info"
    }
    
    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label ${labelColor}"> ${status} </span></p>
                              <h3> ${newDescription} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
