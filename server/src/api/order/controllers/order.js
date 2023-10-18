'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const stripe = require('stripe')(process.env.STRIPE_KEY);

module.exports = createCoreController('api::order.order',({strapi}) =>  ({
   
    async customOrderController(ctx) {
      try {
        const product = ctx.body;
        const entry = await strapi.entityService.findMany('api::product.product',{
    
        });
        return {data:entry}
      } catch (err) {
        console.log(err)
        ctx.body = err;
      }
    },

    async create(ctx){

        try {
        const {product} = ctx.request.body;
        console.log(product)
        
        
        const lineItem = product.map(item => {
            const image = item.image;
            return {
                price_data:{
                 currency:'inr',
                  product_data:{
                    name:item.title,
                    images:[image]
                  },
                  unit_amount: item.price * 100
                },
                quantity:item.quantity
            }
        })

        const session = await stripe.checkout.sessions.create({
            shipping_address_collection:{
                allowed_countries:['IN']
            },
            line_items:lineItem,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/payments/success`,
            cancel_url: `${process.env.CLIENT_URL}/payments/failed`,
          });

            await strapi.entityService.create('api::order.order', {
                data: {
                  product,
                  stripeId:session.id
                },
              });

            return {stripeId:session.id};
              
            
        } catch (error) {
            console.log(error)
            ctx.response.status = 500;
            return error;
        }
    },
}));
