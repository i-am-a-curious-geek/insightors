export const navigation = {
  sidebarConfig: [  
    {      
      category: 'Pre-School Children',
      icon: 'baby',
      path: '/children'    
    },  
    {      
      category: 'Elderly Citizens',
      icon: 'old',
      path: '/elderly'    
    },  
    {      
      category: 'Demographics',
      icon: 'demographics',          
      links: [
        {
          title: 'Pre-School Children',          
          link: '/children',
        },
        {
          title: 'Senior Citizens',          
          link: '/seniors',
        }
      ]
    }
  ]
};