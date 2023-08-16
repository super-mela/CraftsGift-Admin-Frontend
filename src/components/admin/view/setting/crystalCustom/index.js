import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import { GetSettingDetails } from '../../../../services';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';

export default class CrystalCustomize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            founders: [],
            founder: {
                name: "",
                proffession: "",
                priview: "",
                founderimage: "",
                founderfilename: "",
            },
            sizes: [],
            size: {
                id: parseInt(Math.random() * 10000, 10),
                text: "",
                price: 0
            },
            rushs: [],
            rush: {
                id: parseInt(Math.random() * 10000, 10),
                text: "",
                price: 0
            },
            LEDs: [],
            LED: {
                id: parseInt(Math.random() * 10000, 10),
                text: "",
                price: 0
            },
            lines: [],
            line: {
                id: parseInt(Math.random() * 10000, 10),
                text: "",
                price: 0
            },
            fonts: [],
            font: {
                id: parseInt(Math.random() * 10000, 10),
                text: "",
                price: 0
            },
            keychains: [],
            keychain: {
                id: parseInt(Math.random() * 10000, 10),
                text: "",
                price: 0
            },
            cleaingKit: {
                id: parseInt(Math.random() * 10000, 10),
                text: "",
                price: 0
            },
            background: {
                id: parseInt(Math.random() * 10000, 10),
                text: "",
                price: 0
            }
        }
    }

    handleBack() {
        this.props.history.goBack();
    }
    getCrystalOption = async () => {
        let list = await GetSettingDetails.getCrystalCustomOption();
        const crystalOption = list.options
        console.log(crystalOption)
        this.setState({ ...this.state, ...crystalOption })
    }
    async componentDidMount() {
        this.getCrystalOption();
    }
    handleChangeMeta = async (parent, child) => {
        this.setState({ [parent]: [...this.state[parent], this.state[child]] })
        this.setState({ [child]: { id: Math.random(1000), text: "", price: 0 } })
    }
    handleRemove = async (parent, child, index) => {
        const remove = this.state[parent][index]
        this.state.remove = remove
        this.state[parent].splice(index, 1)
        this.setState({ [child]: { id: Math.random(1000), text: "", price: 0 } })
    }
    handleChange = (name, e) => {
        this.setState({ ...this.state, [name]: { ...this.state[name], [e.target.name]: e.target.value } })
    }
    handleSubmit = async event => {
        event.preventDefault();
        const { sizes, LEDs, rushs, fonts, keychains, lines, cleaingKit, background } = this.state
        const data = {
            sizes: sizes,
            LEDs: LEDs,
            rushs: rushs,
            fonts: fonts,
            keychains: keychains,
            lines: lines,
            cleaingKit: cleaingKit,
            background: background
        }
        swal({
            title: "Are you sure?",
            text: "You want to Add/update Crystal Customize Option",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetSettingDetails.createCrystalCustomOption(data);
                    if (list) {
                        NotificationManager.success("Crystal Custom Option Add/Update Successfuly", "Crystal Custom Option")
                    }
                }
            });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-lg-5 col-md-9 col-lg-6 ">
                        <h2 className="mt-30 page-title">Crystal Customize</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Setting</li>
                    <li className="breadcrumb-item active">Crystal Customize</li>
                </ol>
                <div className='card-static-2'>
                    <div className="card-title-2">
                        <h4>Add/Update Crystal Customize Option</h4>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-lg-6 col-md-6  ">
                        <div className="card-body-table mb-10 card-static-3">
                            <div className="form-group">
                                <label className="form-label">Size Option*</label>
                                <div className='bg-light p-2 rounded'>
                                    <input type="text" className="form-control" placeholder="Caption" value={this.state.size.text} name="text" onChange={(e) => this.handleChange("size", e)} />
                                    <input type="number" className="form-control" placeholder="price" value={this.state.size.price} name="price" onChange={(e) => this.handleChange("size", e)} />
                                    <div className='text-right'>
                                        <button className='push-btn mt-0' onClick={() => this.handleChangeMeta("sizes", "size")}>+</button>
                                    </div>

                                </div>
                                {this.state.sizes.length ? <hr /> : null}
                                {this.state.sizes.map((item, i) => (
                                    <div key={item.id} className='bg-light p-2 rounded'>
                                        <input type="text" className="form-control" placeholder="Text" name="text" value={item.text} />
                                        <input type="number" className="form-control" placeholder="Price" name="price" value={item.price} />

                                        <div className='text-right'>
                                            <button className='remove-btn mt-0 hover-btn' onClick={() => this.handleRemove('sizes', 'size', i)}>x</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card-body-table mb-10 card-static-3">
                            <div className="form-group">
                                <label className="form-label">Item Rush Option*</label>
                                <div className='bg-light p-2 rounded'>
                                    <input type="text" className="form-control" placeholder="Caption" name="text" value={this.state.rush.text} onChange={(e) => this.handleChange("rush", e)} />
                                    <input type="number" className="form-control" placeholder="Price" name="price" value={this.state.rush.price} onChange={(e) => this.handleChange("rush", e)} />
                                    <div className='text-right'>
                                        <button className='push-btn mt-0' onClick={() => this.handleChangeMeta("rushs", "rush")}>+</button>
                                    </div>

                                </div>
                                {this.state.rushs.length ? <hr /> : null}
                                {this.state.rushs.map((item, i) => (
                                    <div key={item.id} className='bg-light p-2 rounded'>
                                        <input type="text" className="form-control" placeholder="Title" name="title" value={item.text} />
                                        <input type="text" className="form-control" placeholder="Title" name="title" value={item.price} />

                                        <div className='text-right'>
                                            <button className='remove-btn mt-0 hover-btn' onClick={() => this.handleRemove('rushs', 'rush', i)}>x</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card-body-table mb-10 card-static-3">
                            <div className="form-group">
                                <label className="form-label">LED Base Option*</label>
                                <div className='bg-light p-2 rounded'>
                                    <input type="text" className="form-control" placeholder="Caption" name="text" value={this.state.LED.text} onChange={(e) => this.handleChange("LED", e)} />
                                    <input type="number" className="form-control" placeholder="price" name="price" value={this.state.LED.price} onChange={(e) => this.handleChange("LED", e)} />
                                    <div className='text-right'>
                                        <button className='push-btn mt-0' onClick={() => this.handleChangeMeta("LEDs", "LED")}>+</button>
                                    </div>

                                </div>
                                {this.state.LEDs.length ? <hr /> : null}
                                {this.state.LEDs.map((item, i) => (
                                    <div key={item.id} className='bg-light p-2 rounded'>
                                        <input type="text" className="form-control" placeholder="Caption" name="text" value={item.text} />
                                        <input type="number" className="form-control" placeholder="Price" name="price" value={item.price} />
                                        <div className='text-right'>
                                            <button className='remove-btn mt-0 hover-btn' onClick={() => this.handleRemove("LEDs", "LED", i)}>x</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="card-body-table mb-10 card-static-3">
                            <div className="form-group">
                                <label className="form-label">Number of Line Option*</label>
                                <div className='bg-light p-2 rounded'>
                                    <input type="text" className="form-control" placeholder="Caption" name="text" value={this.state.line.text} onChange={(e) => this.handleChange("line", e)} />
                                    <input type="number" className="form-control" placeholder="price" name="price" value={this.state.line.price} onChange={(e) => this.handleChange("line", e)} />
                                    <div className='text-right'>
                                        <button className='push-btn mt-0' onClick={() => this.handleChangeMeta('lines', "line")}>+</button>
                                    </div>
                                </div>
                                {this.state.lines.length ? <hr /> : null}
                                {this.state.lines.map((item, i) => (
                                    <div key={item.id} className='bg-light p-2 rounded'>
                                        <input type="text" className="form-control" placeholder="Caption" name="text" value={item.text} />
                                        <input type="number" className="form-control" placeholder="price" name="price" value={item.price} />
                                        <div className='text-right'>
                                            <button className='remove-btn mt-0 hover-btn' onClick={(() => this.handleRemove("lines", "line", i))}>x</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card-body-table mb-10 card-static-3">
                            <div className="form-group">
                                <label className="form-label">Text Font Option*</label>
                                <div className='bg-light p-2 rounded'>
                                    <input type="text" className="form-control" placeholder="Caption" name="text" value={this.state.font.text} onChange={(e) => this.handleChange("font", e)} />
                                    <input type="number" className="form-control" placeholder="price" name="price" value={this.state.font.price} onChange={(e) => this.handleChange("font", e)} />
                                    <div className='text-right'>
                                        <button className='push-btn mt-0' onClick={() => this.handleChangeMeta('fonts', 'font')}>+</button>
                                    </div>
                                </div>
                                {this.state.fonts.length ? <hr /> : null}
                                {this.state.fonts.map((item, i) => (
                                    <div key={item.id} className='bg-light p-2 rounded'>
                                        <input type="text" className="form-control" placeholder="Caption" name="text" value={item.text} />
                                        <input type="number" className="form-control" placeholder="Price" name="price" value={item.price} />
                                        <div className='text-right'>
                                            <button className='remove-btn mt-0 hover-btn' onClick={() => this.handleRemove('fonts', 'font', i)}>x</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card-body-table mb-10 card-static-3">
                            <div className="form-group">
                                <label className="form-label">Keychane Option*</label>
                                <div className='bg-light p-2 rounded'>
                                    <input type="text" className="form-control" placeholder="Caption" name="text" value={this.state.keychain.text} onChange={(e) => this.handleChange("keychain", e)} />
                                    <input type="number" className="form-control" placeholder="price" name="price" value={this.state.keychain.price} onChange={(e) => this.handleChange("keychain", e)} />
                                    <div className='text-right'>
                                        <button className='push-btn mt-0' onClick={() => this.handleChangeMeta('keychains', 'keychain')}>+</button>
                                    </div>

                                </div>
                                {this.state.keychains.length ? <hr /> : null}
                                {this.state.keychains.map((item, i) => (
                                    <div key={item.id} className='bg-light p-2 rounded'>
                                        <input type="text" className="form-control" placeholder="Caption" name="text" value={item.text} />
                                        <input type="number" className="form-control" placeholder="Price" name="price" value={item.price} />
                                        <div className='text-right'>
                                            <button className='remove-btn mt-0 hover-btn' onClick={() => this.handleRemove("keychains", "keychain", i)}>x</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-lg-6 col-md-6">
                        <div className="card-body-table mb-10 card-static-3">
                            <div className="form-group">
                                <label className="form-label">Cleaning Kit*</label>
                                <div className='bg-light p-2 rounded'>
                                    <input type="text" className="form-control" placeholder="Caption" name="text" value={this.state.cleaingKit.text} onChange={(e) => this.handleChange('cleaingKit', e)} />
                                    <input type="number" className="form-control" placeholder="price" name="price" value={this.state.cleaingKit.price} onChange={(e) => this.handleChange('cleaingKit', e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="card-body-table mb-10 card-static-3">
                            <div className="form-group">
                                <label className="form-label">Background*</label>
                                <div className='bg-light p-2 rounded'>
                                    <input type="text" className="form-control" placeholder="Caption" name="text" value={this.state.background.text} onChange={(e) => this.handleChange('background', e)} />
                                    <input type="number" className="form-control" placeholder="price" name="price" value={this.state.background.price} onChange={(e) => this.handleChange('background', e)} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-right'>
                    <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add/Update</button>
                </div>
                <br />
            </div >

        )
    }
}
