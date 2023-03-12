// Submit/Add button Listener
document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

// Submit Methods
function submitIssue(e) {
  // Get Input Value
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  // Simple input validation
  if (!description || !assignedTo) {
    if (!description && !assignedTo) {
      return alert("Please type the 'Description' and 'Assigned To' fields!")
    } else if (!description) {
      return alert("Please type the 'Description' field!")
    } else {
      return alert("Please type the 'Assigned To' field!")
    }
  }

  const issue = { id, description, severity, assignedTo, status };

  let issues = JSON.parse(localStorage.getItem('issues')) || [];
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

// Close Issue Methods
const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  // Check current status and replace
  if (currentIssue.status === 'Open') {
    currentIssue.status = 'Closed';
  } else {
    currentIssue.status = 'Open';
  }
  // event.target.remove()
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

// Delete Issue Methods
const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue => issue.id != id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

// Fetch Local Storage
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues')) || [];
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  issues?.forEach(issue => {
      const {id, description, severity, assignedTo, status} = issue;
      issuesList.innerHTML +=   `<div class="well">
                                <h6>Issue ID: ${id} </h6>
                                <p><span ${status === 'Closed' ? `class="label label-warning"` : ''} class="label label-success"> ${status} </span></p>
                                <h3> ${description} </h3>
                                <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                ${status === 'Open' ? `<a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Closed</a>` : `<a href="#" onclick="closeIssue(${id})" class="btn btn-success">Open</a>`}
                                <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                                </div>`;
  })
}
