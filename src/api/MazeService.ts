import Service from '@mazemasterjs/shared-library/Service';
import MazeBase from '@mazemasterjs/shared-library/MazeBase';
import IMazeStub from '@mazemasterjs/shared-library/IMazeStub';

import axios from 'axios';
import Logger from '@mazemasterjs/logger';

// configure logger
const log = Logger.getInstance();

export default {
    GetServiceDetails(): Promise<Service> {
        const query: string = process.env.VUE_APP_API_MAZE_URL + '/service';

        return axios.get(query)
        .then(
            (res) => {
                log.debug('MazeService.ts', 'GetServiceDetails()', 'Success.');

                const service: Service = new Service();
                service.loadFromJson(res.data);
                return service;
            },
            (err) => {
                log.error('MazeService.ts', 'GetServiceDetails()', 'Error ->', err);
                throw err;
            },
        );
    },
    GenerateMaze(width: number, height: number, difficulty: number, name: string, seed: string): Promise<MazeBase> {
        const query: string =
        process.env.VUE_APP_API_MAZE_URL + '/generate/' +
        width + '/' +
        height + '/' +
        difficulty + '/' +
        name + '/' +
        seed;

        return axios.get(query)
        .then(
            (res) => {
                log.debug('MazeService.ts', 'GenerateMaze()', 'Success.');
                const maze: MazeBase = new MazeBase();
                maze.loadData(res.data);
                return maze;
            },
            (err) => {
                log.error('MazeService.ts', 'GenerateMaze()', 'Error ->', err);
                throw err;
            },
        );
    },
    GetAllMazes(): Promise<IMazeStub> {
        const query: string = process.env.VUE_APP_API_MAZE_URL + '/get/all';

        return axios.get(query)
        .then(
            (res) => {
                log.debug('MazeService.ts', 'GetAllMazes()', 'Success.');

                return res.data.map((mazeDat: any) => {
                    const maze: IMazeStub = {
                        id: mazeDat.id,
                        height: mazeDat.height,
                        width: mazeDat.width,
                        challenge: mazeDat.challenge,
                        name: mazeDat.name,
                        seed: mazeDat.seed,
                        note: mazeDat.note,
                        lastUpdated: mazeDat.lastUpdated,
                    };
                    //const maze: MazeBase = new MazeBase();
                    //maze.loadData(mazeDat);
                    return maze;
                });
            },
            (err) => {
                log.error('MazeService.ts', 'GetAllMazes()', 'Error ->', err);
                throw err;
            },
        );
    },
};
