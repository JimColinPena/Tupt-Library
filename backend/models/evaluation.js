const mongoose = require('mongoose')

const evaluationSchema = new mongoose.Schema({
    school_year: {
        type: String
    },
    status: {
        type: String,
        enum: {
            values: ['Active', 'Not Active'],
            message: 'There is error on proccessing this input for Evaluation Model "status" Element'
        }
    },
    ia: {
        type: Boolean,
        // required: true,
    },
    dv: {
        type: Date,
    },
    tr: {
        type: String,
        enum: {
            values: ['Student'],
            message: 'There is error on proccessing this input for Evaluation Model "tr" Element'
        }
    },
    yl: {
        first_year: {
            type: Number,
        },
        second_year: {
            type: Number,
        },
        third_year: {
            type: Number,
        },
        fourth_year: {
            type: Number,
        }
    },
    course: {
        BETAT: {
            type: Number,
        },
        BETChT: {
            type: Number,
        },
        BETCT: {
            type: Number,
        },
        BETET: {
            type: Number,
        },
        BETEMT: {
            type: Number,
        },
        BETElxT: {
            type: Number,
        },
        BETInCT: {
            type: Number,
        },
        BETMT: {
            type: Number,
        },
        BETMecT: {
            type: Number,
        },
        BETNDTT: {
            type: Number,
        },
        BETDMT: {
            type: Number,
        },
        BETHVACRT: {
            type: Number,
        },
        BSCESEP: {
            type: Number,
        },
        BSEESEP: {
            type: Number,
        },
        BSECESEP: {
            type: Number,
        },
        BSMESEP: {
            type: Number,
        },
        BSIT: {
            type: Number,
        },
        BSIS: {
            type: Number,
        },
        BSESSDP: {
            type: Number,
        },
        BGTAT: {
            type: Number,
        },
        BTVTEdET: {
            type: Number,
        },
        BTVTEdLXt: {
            type: Number,
        },
        BTVTEdICT: {
            type: Number,
        }
    },
    gender: {
        male: {
            type: Number,
        },
        female: {
            type: Number,
        }
    },
    sra: {
        excellent: {
            type: Number,
        },
        good: {
            type: Number,
        },
        average: {
            type: Number,
        },
        poor: {
            type: Number,
        },
        very_poor: {
            type: Number,
        }
    },
    lav: {
        excellent: {
            type: Number,
        },
        good: {
            type: Number,
        },
        average: {
            type: Number,
        },
        poor: {
            type: Number,
        },
        very_poor: {
            type: Number,
        }
    },
    clean: {
        excellent: {
            type: Number,
        },
        good: {
            type: Number,
        },
        average: {
            type: Number,
        },
        poor: {
            type: Number,
        },
        very_poor: {
            type: Number,
        }
    },
    ho: {
        excellent: {
            type: Number,
        },
        good: {
            type: Number,
        },
        average: {
            type: Number,
        },
        poor: {
            type: Number,
        },
        very_poor: {
            type: Number,
        }
    },
    brb: {
        excellent: {
            type: Number,
        },
        good: {
            type: Number,
        },
        average: {
            type: Number,
        },
        poor: {
            type: Number,
        },
        very_poor: {
            type: Number,
        }
    },
    opac: {
        excellent: {
            type: Number,
        },
        good: {
            type: Number,
        },
        average: {
            type: Number,
        },
        poor: {
            type: Number,
        },
        very_poor: {
            type: Number,
        }
    },
    bc: {
        excellent: {
            type: Number,
        },
        good: {
            type: Number,
        },
        average: {
            type: Number,
        },
        poor: {
            type: Number,
        },
        very_poor: {
            type: Number,
        }
    },
    pc: {
        excellent: {
            type: Number,
        },
        good: {
            type: Number,
        },
        average: {
            type: Number,
        },
        poor: {
            type: Number,
        },
        very_poor: {
            type: Number,
        }
    },
    tps: {
        excellent: {
            type: Number,
        },
        good: {
            type: Number,
        },
        average: {
            type: Number,
        },
        poor: {
            type: Number,
        },
        very_poor: {
            type: Number,
        }
    },
    er: {
        excellent: {
            type: Number,
        },
        good: {
            type: Number,
        },
        average: {
            type: Number,
        },
        poor: {
            type: Number,
        },
        very_poor: {
            type: Number,
        }
    },
    skaq: {
        excellent: {
            type: Number,
        },
        good: {
            type: Number,
        },
        average: {
            type: Number,
        },
        poor: {
            type: Number,
        },
        very_poor: {
            type: Number,
        }
    },
    css: {
        excellent: {
            type: Number,
        },
        good: {
            type: Number,
        },
        average: {
            type: Number,
        },
        poor: {
            type: Number,
        },
        very_poor: {
            type: Number,
        }
    },

})
module.exports = mongoose.model('Evaluation', evaluationSchema);