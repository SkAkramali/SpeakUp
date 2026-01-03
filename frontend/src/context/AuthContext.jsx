import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Initial mock issues that will be shared across all dashboards
const initialIssues = [
  { id: 1, title: 'Street Light Broken', description: 'The street light on 5th Avenue is flickering.', status: 'Open', category: 'Infrastructure', author: 'Jane Doe', timestamp: Date.now() - 86400000, image: null },
  { id: 2, title: 'Garbage Collection Delayed', description: 'Trash has not been picked up for 2 weeks.', status: 'In Progress', category: 'Sanitation', author: 'John Smith', timestamp: Date.now() - 172800000, image: null },
  { id: 3, title: 'Pothole on Main Road', description: 'Large pothole causing accidents.', status: 'Resolved', category: 'Roads', author: 'Sarah Wilson', timestamp: Date.now() - 259200000, image: null },
  { id: 4, title: 'Water Supply Issue', description: 'No water supply since morning.', status: 'Open', category: 'Water', author: 'Mike Brown', timestamp: Date.now() - 43200000, image: null },
  { id: 5, title: 'Park Maintenance Required', description: 'Park benches are broken.', status: 'Resolved', category: 'Parks', author: 'Emily Davis', timestamp: Date.now() - 432000000, image: null },
  { id: 6, title: 'Traffic Signal Not Working', description: 'Signal at junction is malfunctioning.', status: 'In Progress', category: 'Traffic', author: 'David Lee', timestamp: Date.now() - 86400000, image: null },
  { id: 7, title: 'Drainage Blocked', description: 'Water logging due to blocked drainage.', status: 'Open', category: 'Sanitation', author: 'Anna Kumar', timestamp: Date.now() - 129600000, image: null }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [sharedIssues, setSharedIssues] = useState(initialIssues);

  // Load data from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('speakup_user');
    const storedUsers = localStorage.getItem('speakup_registered_users');
    const storedIssues = localStorage.getItem('speakup_issues');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedUsers) {
      setRegisteredUsers(JSON.parse(storedUsers));
    }
    if (storedIssues) {
      setSharedIssues(JSON.parse(storedIssues));
    }
  }, []);

  // Save issues to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('speakup_issues', JSON.stringify(sharedIssues));
  }, [sharedIssues]);

  const register = (userData) => {
    const { name, email, password, role } = userData;
    
    // Check if email already exists
    const existingUser = registeredUsers.find(u => u.email === email);
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = { 
      id: Date.now(), 
      name, 
      email, 
      password, 
      role,
      createdAt: Date.now()
    };
    
    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('speakup_registered_users', JSON.stringify(updatedUsers));
    
    return { success: true, message: 'Registration successful!' };
  };

  const login = (email, password) => {
    // Find user by email and password
    const foundUser = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const loggedInUser = { id: foundUser.id, name: foundUser.name, role: foundUser.role, email: foundUser.email };
      setUser(loggedInUser);
      localStorage.setItem('speakup_user', JSON.stringify(loggedInUser));
      return { success: true, user: loggedInUser };
    }
    
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('speakup_user');
  };

  // Add new issue - visible to all dashboards
  const addIssue = (issue) => {
    const newIssue = {
      id: Date.now(),
      ...issue,
      status: 'Open',
      timestamp: Date.now()
    };
    setSharedIssues(prev => [newIssue, ...prev]);
    return newIssue;
  };

  // Update issue status - updates across all dashboards
  const updateIssueStatus = (issueId, newStatus) => {
    setSharedIssues(prev => 
      prev.map(issue => 
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      )
    );
  };

  // Add response to issue
  const addIssueResponse = (issueId, response, responderName) => {
    setSharedIssues(prev => 
      prev.map(issue => 
        issue.id === issueId ? { ...issue, politicianResponse: response, responderName } : issue
      )
    );
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register,
      registeredUsers,
      sharedIssues,
      addIssue,
      updateIssueStatus,
      addIssueResponse
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
