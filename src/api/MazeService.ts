import Service from '@mazemasterjs/shared-library/Service';
import MazeBase from '@mazemasterjs/shared-library/MazeBase';

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
                let maze: MazeBase = new MazeBase();
                maze.loadData(res.data);
                return maze;
            },
            (err) => {
                log.error('MazeService.ts', 'GenerateMaze()', 'Error ->', err);
                throw err;
            },
        );
    },
    GetAllMazes(): Promise<MazeBase> {
        const query: string = process.env.VUE_APP_API_MAZE_URL + '/get/all';

        return axios.get(query)
        .then(
            (res) => {
                log.debug('MazeService.ts', 'GetAllMazes()', 'Success.');

                return res.data.map((mazeDat: any) => {
                    let maze: MazeBase = new MazeBase();
                    maze.loadData(mazeDat);
                    return maze;
                });

                //const mazes: Array<Maze> = new Array<Maze>();
                //res.data.forEach((maze: any) => mazes.push(new Maze(maze)));
                //return mazes;
            },
            (err) => {
                log.error('MazeService.ts', 'GetAllMazes()', 'Error ->', err);
                throw err;
            },
        );
    },
};
