export const adminColorComponents = [
  {
    id : 1,
    name : 'Authorization',
    component: 'AuthLayoutComponent',
    url : 'Component/AuthLayout',
    child : [
      {
        id : 1,
        name : 'Background Color',
        style : 'backgroundColor',
        dto : ["name","backgroundColor"]
      },
      {
        id : 2 ,
        name : 'Login',
        component : 'LoginComponent',
        url : 'Component/Login',
        child : [
          {
            id : 1,
            name : 'Background Color',
            style : 'backgroundColor',
            dto : ["name", "backgroundColor"]
          },
          {
            id : 2,
            name : 'Color',
            style : 'color',
            dto : ["name", "color"]
          },
          {
            id: 3,
            name : 'Border Color',
            style : 'borderColor',
            dto  : ["name",'borderColor']
          }
        ]
      },
       {
        id : 3,
        name : 'Register',
        url : 'Component/Register',
        component : 'RegisterComponent',
        child : [
          {
            id : 1,
            name : 'Background Color',
            style : 'backgroundColor',
            dto : ["name","backgroundColor"]
          },
          {
            id : 2,
            name : 'Color',
            style : 'color',
            dto : ["name","color"]
          },

        ]
      }
    ]
  },
  {
    id : 2 ,
    name : 'Calendar'
  },
  {
    id : 3,
    name :"Web Pages",
  },
  {
    id : 4,
    name : "Widgets"
  }
  ]

  export const adminTypographyComponents = [
 {
    id : 1,
    name : 'Authorization',
    component: 'AuthLayoutComponent',
    url : 'Component/AuthLayout',
    child : [
      {
        id : 1 ,
        name : 'Login',
        component : 'LoginComponent',
        url : 'Component/Login',
        style : 'font',
        dto : ["name", "font"]
      },
       {
        id : 2,
        name : 'Register',
        url : 'Component/Register',
        component : 'RegisterComponent',
            style : 'font',
            dto : ["name","font"]
      }
    ]
  },
  {
    id : 2 ,
    name : 'Calendar'
  },
  {
    id : 3,
    name :"Web Pages",
  },
  {
    id : 4,
    name : "Widgets"
  }
  ]
   export const presetFonts = ['Arial', 'Times', 'Courier', 'Lato', 'Open Sans', 'Roboto Slab'];
