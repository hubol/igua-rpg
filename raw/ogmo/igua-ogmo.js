
function hook() {
    const { exec } = require("child_process");
    const path = require("path");

    function execute(directory, command) {
        return new Promise((resolve, reject) => {
            exec(command, { cwd: directory }, (error, stdout, stderr) => {
                console.log(`${directory} ${command} stdout: ${stdout}`);
                if (stderr)
                    console.log(`${directory} ${command} stderr: ${stderr}`);
                if (error)
                    return reject(error);
                resolve(stdout);
            });
        });
    }

    function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    function getStyle() {
        const hubolStyle = document.getElementById('hubol');
        if (hubolStyle)
            return hubolStyle;
        const style = document.createElement('style');
        style.id = 'hubol';
        style.type = 'text/css';
        return document.getElementsByTagName('head')[0].appendChild(style);
    }

    // language=CSS
    getStyle().innerHTML = `
        .hubol_message {
            position: fixed;
            bottom: 48px;
            left: 8px;
            pointer-events: none;
            padding: 16px;
            border-radius: 8px;
            background-color: #dddddd;
            box-shadow: 4px 4px 8px #333333;
        }
`;

    let running = false;

    function requestRunGenLevelArgs(projectPath) {
        /* "C:\Users\Hubol\Projects\igua-rpg\raw\ogmo\igua.ogmo" */
        const rootPath = path.resolve(projectPath, '../../../');
        setTimeout(async () => {
            if (running) return;
            running = true;
            const msg = createMessage();
            try {
                msg.textContent = 'npm run gen:levelargs...';
                msg.count();
                const stdout = await execute(rootPath, 'npm run gen:levelargs');
                const lines = (stdout.match(/\n/g) || '').length;
                msg.textContent = `Done! ${lines} lines.`;
            }
            catch (e) {
                console.error(e);
                msg.textContent = `Failure. ${JSON.stringify(e)}`;
            }
            finally {
                running = false;
            }
            await sleep(5000);
            msg.remove();
        });
    }

    function createMessage() {
        const div = document.createElement('div');
        div.className = 'hubol_message';

        div.count = () => {
            const text = div.textContent;
            let seconds = 0;
            const interval = setInterval(() => {
                if (!div.textContent.startsWith(text))
                    return clearInterval(interval);
                seconds++;
                div.textContent = `${text} (${seconds}s)`
            }, 1000);
        }
        return document.body.appendChild(div);
    }

    return {
        beforeSaveLevel: (project, data) => {
            requestRunGenLevelArgs(project.path);
            return data;
        },
        beforeSaveProject: (project, data) => {
            requestRunGenLevelArgs(project.path);
            return data;
        },
    }
}

hook();
