exports.create = async (req,res) => {
    const Company = require('../models/company');
    let fakeBody = {
        name:'ebit',
        ruc:'1314497726',
        owner:{
            name:'Joseph Garcia',
            mail:'joseph_dgb@hotmail.com',
            contacts:[
                {name:'Joseph Garcia',number:'0939308696'},
                {name:'Elian Garcia',number:'0988776700'},
            ]
        },
        domain:{
            name:'ebit-ec.com',
            created_at:Date.now(),
            expired_at:Date.now(),
            updated_at:Date.now()
        },
        mails:[
            {mail:'contabilidad'},
            {mail:'facturacion'}
        ],
        coords:[
            {name:'Primer local', lat:1229, lng:-1023},
            {name:'Segundo local', lat:1229, lng:-1023},
        ],
        activations:[
            {created_at:Date.now(),expired_at:Date.now(),paid_out:{value:500,state:false}}
        ]
    };

    const company = new Company({
        name:fakeBody.name,
        ruc:fakeBody.ruc,
        owner:fakeBody.owner,
        domain:fakeBody.domain,
        coords:fakeBody.coords,
        activations:fakeBody.activations
    });
    
    company.save((error,response)=>{
        if(response) res.status(200).json({ok:true,response:response});
        if(error) res.status(500).json({ok:true,response:error});

    })
    
}