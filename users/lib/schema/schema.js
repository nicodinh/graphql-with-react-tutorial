const graphql = require('graphql');
const axios   = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        console.log('CompanyType:', '\n\tparentValue:', parentValue, '\n\targs:', args);
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(response => response.data);
      }      
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        console.log('UserType:', '\n\tparentValue:', parentValue, '\n\targs:', args);
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(response => {
            console.log(`\tCompany #${parentValue.companyId}:\n\t`, response.data);
            return response.data;
          });
          //.then(response => response.data);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        console.log('RootQuery user:', '\n\tparentValue:', parentValue, '\n\targs:', args);
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(response => response.data);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        console.log('RootQuery company:', '\n\tparentValue:', parentValue, '\n\targs:', args);
        return axios.get(`http://localhost:3000/companies/${args.id}`)
          .then(response => response.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});