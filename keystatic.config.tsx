import { config, fields, collection, component } from '@keystatic/core';

export default config({
    storage: {
        kind: 'github',
        repo: 'bytechlabs/www',
    },
    cloud: {
        project: 'bytechlabs/flagship',
    },
    collections: {
        work: collection({
            label: 'Work',
            slugField: 'title',
            path: 'content/work/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                client: fields.text({ label: 'Client' }),
                description: fields.text({ label: 'Description', multiline: true }),
                coverImage: fields.image({
                    label: 'Cover Image',
                    directory: 'public/images/work',
                    publicPath: '/images/work',
                }),
                publishedDate: fields.date({ label: 'Published Date' }),
                techStack: fields.array(
                    fields.text({ label: 'Tech' }),
                    { label: 'Tech Stack', itemLabel: props => props.value }
                ),
                industries: fields.array(
                    fields.relationship({
                        label: 'Industry',
                        collection: 'industries',
                    }),
                    { label: 'Related Industries', itemLabel: props => props.value || 'Unknown Industry' }
                ),
                content: fields.document({
                    label: 'Content',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: {
                        directory: 'public/images/work/content',
                        publicPath: '/images/work/content',
                    },
                    componentBlocks: {
                        'Callout': component({
                            label: 'Callout',
                            schema: {
                                type: fields.select({
                                    label: 'Type',
                                    options: [
                                        { label: 'Info', value: 'info' },
                                        { label: 'Warning', value: 'warning' },
                                        { label: 'Tip', value: 'tip' },
                                    ],
                                    defaultValue: 'info',
                                }),
                                content: fields.child({
                                    kind: 'block',
                                    placeholder: 'Callout content...',
                                }),
                            },
                            preview: (props) => {
                                return <>{props.fields.content.element}</>;
                            },
                        }),
                        'InteractiveGraph': component({
                            label: 'Interactive Graph',
                            schema: {
                                title: fields.text({ label: 'Graph Title' }),
                            },
                            preview: (props) => (
                                <div style={{ padding: '1rem', background: '#1a1a1a', color: '#fff', border: '1px solid #333' }}>
                                    Graph: {props.fields.title.value || 'Untitled'}
                                </div>
                            ),
                        }),
                    },
                }),
            },
        }),
        services: collection({
            label: 'Services',
            slugField: 'title',
            path: 'content/services/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                icon: fields.text({ label: 'Icon (Unicode/Emoji)' }),
                description: fields.text({ label: 'Short Description' }),
                content: fields.document({
                    label: 'Details',
                    formatting: true,
                    dividers: true,
                    links: true,
                }),
            }
        }),
        industries: collection({
            label: 'Industries',
            slugField: 'title',
            path: 'content/industries/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                customTitle: fields.text({ label: 'Display Title (Optional)' }),
                icon: fields.text({ label: 'Icon (Unicode/Emoji)' }),
                description: fields.text({ label: 'Short Description' }),
                content: fields.document({
                    label: 'Details',
                    formatting: true,
                    dividers: true,
                    links: true,
                }),
            }
        }),
        studio: collection({
            label: 'Studio',
            slugField: 'title',
            path: 'content/studio/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                role: fields.text({ label: 'Role' }),
                bio: fields.text({ label: 'Bio', multiline: true }),
                avatar: fields.image({
                    label: 'Avatar',
                    directory: 'public/images/team',
                    publicPath: '/images/team',
                }),
                content: fields.document({
                    label: 'Long Bio/Content',
                    formatting: true,
                })
            }
        })
    },
});
