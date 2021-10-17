<?php

declare(strict_types=1);

namespace EMS\AdminBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;

final class EMSAdminExtension extends Extension implements PrependExtensionInterface
{
    /**
     * @param array<mixed> $configs
     */
    public function load(array $configs, ContainerBuilder $container): void
    {
    }

    public function prepend(ContainerBuilder $container): void
    {
        $container->loadFromExtension('twig', [
            'paths' => [
                '%kernel.project_dir%/vendor/elasticms/admin-bundle/src/Resources/views/bundles/EMSCoreBundle' => 'EMSCore',
            ],
        ]);
    }
}
